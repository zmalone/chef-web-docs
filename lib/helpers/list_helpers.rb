module ListHelpers
  def unstyled_list(&block)
    concat(
      content_tag(:ul, style: "list-style-type: none;") do
        capture(&block)
      end
    )
  end

  def icon_list_item(foundation_icon, &block)
    concat(
      content_tag(:li) do
        "<i class='fa fa-#{foundation_icon}' style='min-width: 21px;'></i>&nbsp;" + capture(&block)
      end
    )
  end
end
