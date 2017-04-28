module MarkdownHelpers
  def markdown(&block)
    concat render_markdown(&block)
  end

  def render_markdown(&block)
    return '' unless block_given?
    content = capture_html(&block)
    render_markdown_string(content)
  end

  def render_markdown_string(content)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(content)
  end
end
