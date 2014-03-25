require 'active_support/inflector'

# Helper methods for creating tabs
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

  def tab(title, &block)
    concat(
      content_tag(:section) do
        content_tag(:p, 'class'              => 'title',
                        'data-section-title' => true) do
          link_to(title, "##{parameterize(title)}")
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
