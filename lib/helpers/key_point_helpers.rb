module KeyPointHelpers
  def key_point(text)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)
    concat(
      content_tag(:div, class: "alert-box headline") do
        content_tag(:span, class: "key-point-label") {"KEY POINT: "} + markdown.render(text).gsub(/<p>(.*?)<\/p>/, '\1')
      end
    )
  end

  def key_points(points, ordered = false)
    list_class = ordered ? :ol : :ul
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)
    concat(
      content_tag(:div, class: "alert-box headline") do
        content_tag(:div, class: "key-point-label") {"KEY POINTS:"} +
        content_tag(list_class, class: "key-point") do
          points.map do |point|
            content_tag(:li, class: "key-point") do
              markdown.render(point)
            end
          end.join
        end
      end
    )
  end
end
