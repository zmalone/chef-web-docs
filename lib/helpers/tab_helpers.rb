require 'active_support/inflector'

# Helper methods for creating tabs
#
# Helpers that build big old DOM trees with content_tag methods are terrible.
# These only exist because Middleman does not support passing blocks to partials.
#
# The preferred way to do these would be something like:
#
#     <%= partial 'common/tab' do %>your stuff<% end %>
#
# and have those partials just use regular ERB to wrap the content passed into
# them.
module TabHelpers
  delegate :parameterize, to: ActiveSupport::Inflector

  def tabs(&block)
    concat(
      content_tag(:div, 'class'        => 'section-container tabs',
                        'data-section' => true,
                        'data-options' => 'deep_linking: true') do
        capture(&block)
      end
    )
  end

  def tab(title, options = {}, &block)
    concat(
      content_tag(:section) do
        generate_tab_title(title,options) + generate_tab_content(title,capture(&block),options)
      end
    )
  end

  def generate_tab_title(title,options)
    tab_title_text = title
    
    if options[:icon]
      tab_title_text = "<i class='icon-#{options[:icon]}'></i> #{tab_title_text}"
    end

    title_content = link_to tab_title_text, "##{parameterize(title)}"
    content_tag(:p,title_content, 'class' => 'title', 'data-section-title' => true)
  end

  def generate_tab_content(title,content,options)
    content_tag(:div, content, 'class' => 'content',
                               'data-section-content' => true,
                               'data-slug' => parameterize(title))
  end

end
