module ButtonHelpers
  def platform_button(href, logo, text, logo_width)
    logo_width = 25 if logo_width == -1
    concat(
      content_tag(:a, href: href) do
        content_tag(:span, class: 'button radius cta', style:"width: 300px;") do
          image_tag(logo, style:"display:inline; margin-top: 0px; margin-bottom: 0px; margin-right: 7px; box-shadow:none;", width: logo_width) +
          content_tag(:span, style: 'vertical-align:middle;') do
            text + " <i class='fa fa-angle-double-right'></i>"
          end
        end
      end
    )
  end
end
