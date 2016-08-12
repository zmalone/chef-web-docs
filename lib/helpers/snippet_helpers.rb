module SnippetHelpers
  def render_machine_config(path)
    require 'pathname'
    concat(File.read(Pathname.new(path).cleanpath))
  end

  def command_snippet(page: nil, path:, workstation: nil, replace_prompt: nil, features: [:stdin, :stdout])
    workstation ||= page.data.snippet_workstation if page
    if page
      path = File.join(page.data.snippet_path, path + "-#{workstation}")
    else
      path = path + "-#{workstation}"
    end
    render_snippet(path) do |_metadata|
      [*features].map do |feature|
        content = IO.read(File.join('snippets', path, feature.to_s))
        if feature == :stdin && (replace_prompt || (page && page.data.replace_prompt))
          replace_prompt ||= current_page.data.replace_prompt
          content.sub!(/^.+\$/, replace_prompt)
        end
        content
      end.join
    end
  end

  def code_snippet(page: nil, path:)
    path = File.join(page.data.snippet_path, path) if page

    render_snippet(path) do |metadata|
      IO.read(File.join('snippets', path, metadata[:file]))
    end
  end

  private

  def render_snippet(path, &block)
    begin
      snippet_path = File.join('snippets', path)
      metadata = load_metadata(snippet_path)

      language = metadata[:language]
      path = commentize_path(metadata[:display_path], language)
      body = yield metadata
      body += "\n" unless body.end_with? "\n"

      concat "```#{language}\n#{path}\n#{body}```"
    rescue Exception => e
      concat "```plaintext\n\# error\nFailed to load snippet '#{snippet_path}'\n#{e.to_s}\n```"
    end
  end

  def commentize_path(path, language)
    case language
    when 'conf', 'ruby', 'ini', 'yaml', 'powershell', 'bash', 'ps'
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
