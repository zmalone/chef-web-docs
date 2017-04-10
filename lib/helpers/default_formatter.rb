module Middleman
  module Syntax
    module Highlighter

      class DefaultFormatter
        def render(lexed_code, highlighter_options, style_options = {})
          formatter = Rouge::Formatters::HTMLLegacy.new(highlighter_options)
          pygments_wrap formatter.format(lexed_code), highlighter_options[:css_class]
        end

        def pygments_wrap(content,css_class)
          "<div class='#{css_class}'><pre>#{content}</pre></div>"
        end
      end

    end
  end
end
