module MarkdownHelpers
  def markdown(&block)
    concat render_markdown(&block)
  end

  def render_markdown(&block)
    return '' unless block_given?
    content = capture_html(&block)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(content)#.to_s.strip).gsub(/<\/?p>/, '').strip
  end
end
