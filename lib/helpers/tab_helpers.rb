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
        content_tag(:p, 'class'              => 'title',
                        'data-section-title' => true) do
          tab_title_text = title
          if options[:icon]
            tab_title_text = "<i class='icon-#{options[:icon]}'></i> #{tab_title_text}"
          end
          link_to tab_title_text, "##{parameterize(title)}"
        end
        content_tag(:div, 'class'                => 'content',
                          'data-section-content' => true,
                          'data-slug'            => parameterize(title)) do
          capture(&block)
        end
      end
    )
  end
end
