module PageNavHelpers
  def next_page(page, &block)
    concat(
      content_tag(:div, class: 'box') do
        output = []

        if page.parent.data.layout == "lesson-options"
          next_page = page.parent.parent.children.select {|s| s.data.order == page.parent.data.order + 1}.first
        else
          next_page = page.parent.children.select {|s| s.data.order == page.data.order + 1}.first
        end

        output << content_tag(:h2) do
          "Next" + (next_page.nil? ? '' : ":&nbsp;#{next_page.data.title}")
        end
        output << render_markdown(&block)

        if next_page.nil?
          output << link_to("Back to Tutorials <i class='fa fa-angle-double-right'></i>", "/tutorials/", class: 'button radius')
        else
          output << link_to("Next&nbsp;<i class='fa fa-angle-double-right'></i>", next_page, class: 'button radius')
        end

        output.join
      end
    )
  end
end
