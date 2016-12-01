module SnippetHelpers
  def render_machine_config(path)
    require 'pathname'
    begin
      concat(File.read(Pathname.new(path).cleanpath))
    rescue Errno::ENOENT => e
      if deploy?
        raise e
      else
        concat "**Failed to load machine config '#{path}'<br>#{e.to_s}**\n\n\n".gsub(/_/, '\_').gsub(/\\\\_/, '\_')
      end
    end
  end

  def command_snippet(page: nil, path:, workstation: nil, replace_prompt: nil, features: [:stdin, :stdout], indent_level: 0)
    workstation ||= page.data.snippet_workstation if page
    if page
      path = File.join(page.data.snippet_path, path + "-#{workstation}")
    else
      path = path + "-#{workstation}"
    end
    render_snippet(path, indent_level) do |_metadata|
      [*features].map do |feature|
        content = IO.read(File.join('snippets', path, feature.to_s))
        if [:stdin, :exitstatus].include?(feature) && (replace_prompt || (page && page.data.replace_prompt))
          replace_prompt ||= current_page.data.replace_prompt
          content.sub!(/^.+\$/, replace_prompt)
        end
        content
      end.join
    end
  end

  def code_snippet(page: nil, path:, indent_level: 0)
    path = File.join(page.data.snippet_path, path) if page

    render_snippet(path, indent_level) do |metadata|
      IO.read(File.join('snippets', path, metadata[:file]))
    end
  end

  private

  def render_snippet(path, indent_level, &block)
    begin
      snippet_path = File.join('snippets', path)
      metadata = load_metadata(snippet_path)

      language = metadata[:language]
      path = commentize_path(metadata[:display_path], language)
      body = yield metadata
      body += "\n" unless body.end_with? "\n"

      concat "#{"  " * indent_level}```#{language}\n#{path}\n#{body}```"
    rescue Exception => e
      if deploy?
        raise e
      else
        concat "```plaintext\n\# error\nFailed to load snippet '#{snippet_path}'\n#{e.to_s}\n```"
      end
    end
  end

  def commentize_path(path, language)
    case language
    when 'conf', 'ruby', 'ini', 'yaml', 'powershell', 'bash', 'ps', 'shell', 'json'
      '# ' + path
    when 'html'
      "<!-- #{path} -->"
    when 'sql'
      '-- ' + path
    when 'plaintext'
      ''
    end
  end

  # Remember the previous metadata to reduce I/O.
  @@cached_metadata = { path: 'dummy', metadata: nil }

  def load_metadata(path)
    require 'yaml'
    metadata_path = File.join(path, 'metadata.yml')
    unless @@cached_metadata[:path] == metadata_path
      @@cached_metadata = { path: metadata_path, metadata: YAML.load_file(metadata_path) }
    end
    @@cached_metadata[:metadata]
  end
end
