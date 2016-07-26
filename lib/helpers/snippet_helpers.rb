module SnippetHelpers
  def load_machine_config
    require 'pathname'
    machine_config_path = current_page.data[:machine_config] || current_page.parent.data[:machine_config] || nil
    return nil unless machine_config_path
    machine_config_path = File.join('snippets', machine_config_path, 'machine_config.yml')
    machine_config_path = Pathname.new(machine_config_path).cleanpath
    File.exist?(machine_config_path) ? YAML.load_file(machine_config_path) : nil
  end

  def command_snippet(page: nil, path:, features: [:stdin, :stdout])
    path = File.join(page.data.snippet_path, path) if page

    render_snippet(path) do |_metadata|
       [*features].map{|feature| IO.read(File.join('snippets', path, feature.to_s)) }.join
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
    rescue
      concat "```plaintext\n\# error\nFailed to load snippet '#{snippet_path}'\n```"
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
