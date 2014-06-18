module Middleman
  module Syntax
    module Highlighter

      class CodeFormatter
        def render(lexed_code, highlighter_options)
          highlighter_options.merge!(:line_numbers => true)

          lexed_code, filepath = extract_filepath_if_present(lexed_code)
          formatter = Rouge::Formatters::HTML.new(highlighter_options)
          inner_content = pygments_wrap formatter.format(lexed_code), highlighter_options[:css_class]
          source_window inner_content, filepath
        end

        def extract_filepath_if_present(lexed_code)
          first_token_type, first_token_content = lexed_code.first

          if comment_token?(first_token_type)
            # Bad that I am specifying the comment to strip ... this does not port
            [ remove_comment(lexed_code), create_title_from_comment(first_token_content) ]
          else
            [ lexed_code, default_filename ]
          end
        end

        # Sometimes the token type is Token.Comment.Single or Token.Comment
        def comment_token?(token)
          token.name == :Comment || token.parent.name == :Comment
        end

        def remove_comment(lexed_code)
          lexed_code.to_a[1..-1]
        end

        def create_title_from_comment(content)
          content.gsub(/^\s\S+\s*/,"")
        end

        def default_filename
          "Random File"
        end

        def pygments_wrap(content,css_class)
          "<div class='#{css_class}'><pre>#{content}</pre></div>"
        end

        def source_window(content,filepath)
          %{<div class="window">
            <nav class="control-window">
              <a href="#finder" class="close" data-rel="close">close</a>
              <a href="#" class="minimize">minimize</a>
              <a href="#" class="deactivate">deactivate</a>
            </nav>
            <h1 class="titleInside">#{filepath}</h1>
            <div class="container"><div class="editor">#{content}</div></div>
          </div>}
        end
      end

    end
  end
end
