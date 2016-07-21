module SnippetHelpers
  def command_snippet(step, snippet_id = 'default', features = [:stdin, :stdout])
    render_snippet(step, snippet_id) do |snippet, snippet_path|
      [*features].map{|feature| IO.read(File.join(snippet_path, snippet[:output_base] + '.' + feature.to_s)) }.join
    end
  end

  def code_snippet(step, snippet_id = 'default')
    render_snippet(step, snippet_id) do |snippet, snippet_path|
      IO.read(File.join(snippet_path, snippet[:file]))
    end
  end

  private

  def render_snippet(step, snippet_id, &block)
    begin
      page = current_page
      snippet_path = File.join('snippets', File.dirname(page.path))
      manifest = load_manifest(snippet_path, step)

      snippet = manifest[:snippets].find {|s| s[:id] == snippet_id}

      language = snippet[:language]
      path = commentize_path(snippet[:path], language)
      body = yield snippet, snippet_path
      body += "\n" unless body.end_with? "\n"

      concat "```#{language}\n#{path}\n#{body}```"
    rescue
      concat "```plaintext\n\# error\nFailed to load snippet #{snippet_id}\n```"
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

  # Remember the previous manifest to reduce I/O.
  @@cached_manifest = { path: 'dummy', manifest: nil }

  def load_manifest(path, snippet_id)
    require 'yaml'
    manifest_path = File.join(path, snippet_id + '.yml')
    unless @@cached_manifest[:path] == manifest_path
      @@cached_manifest = { path: manifest_path, manifest: YAML.load_file(manifest_path) }
    end
    @@cached_manifest[:manifest]
  end
end
