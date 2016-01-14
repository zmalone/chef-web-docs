module BoxHelpers
  def box(&block)
    concat(
      content_tag(:div, class: 'box') do
        markdown(&block)
      end
    )
  end
end
