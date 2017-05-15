module PageNavHelpers
  # TODO: this can possibly be improved by using metadata
  def get_categories(pages)
    a = [
      {:category => 'getting-started',
        :display => 'Get started with Chef'.upcase,
        :topics => []
      },
      {:category => 'local-development',
        :display => 'Develop and test locally'.upcase,
        :topics => []
      },
      {:category => 'continuous-automation',
        :display => 'Continuous automation'.upcase,
        :topics => []
      },
      {:category => 'integrated-compliance',
        :display => 'Integrated compliance'.upcase,
        :topics => []
      },
      {:category => 'extending-chef',
        :display => 'Extending Chef'.upcase,
        :topics => []
      }
    ]
    pages.each do |t|
      if t.data.type == "topic" && !t.data.deprecated
        h = a.find{|h| h[:category] == t.data.category}
        h[:topics] << t if h
      end
    end
    a
  end

  def next_page(page, &block)
    concat(
      content_tag(:div, class: 'box') do
        output = []

        if page.parent.data.layout == "lesson-options"
          next_page = page.parent.parent.children.select {|s| s.data.order == page.parent.data.order + 1}.first
        else
          next_page = page.parent.children.select {|s| s.data.order == page.data.order + 1}.first
        end

        # We don't want a Next button if the next page is an appendix. Rather, we want to
        # show the conclusion.
        if next_page&.data&.appendix == true
          next_page = nil
        end

        if next_page
          #output << link_to("#next", anchor: "next")
          output << content_tag(:a, "", {"name"=>"next", "href"=>"#next", "class"=>"anchor"})
          heading = "Next:&nbsp;#{next_page.data.title}"
        else
          output << content_tag(:a, "", {"name"=>"conclusion", "href"=>"#conclusion", "class"=>"anchor"})
          #output << link_to("#conclusion", anchor: "conclusion")
          heading = "Conclusion"
        end

        output << content_tag(:h2) do
          heading
        end
        output << render_markdown(&block)

        if next_page.nil?
          output << link_to("Back to Modules <i class='fa fa-angle-double-right'></i>", "/modules/", class: 'button radius')
        else
          output << link_to("Next&nbsp;<i class='fa fa-angle-double-right'></i>", next_page, class: 'button radius cta')
        end

        output.join
      end
    )
  end
end
