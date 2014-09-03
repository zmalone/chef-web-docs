module Middleman
  module Syntax
    module Highlighter
      class CodeFormatter
        def render(lexed_code, highlighter_options)
          highlighter_options.merge!(:line_numbers => true)
          lexed_code, filepath, has_filepath = extract_filepath_if_present(lexed_code)
          formatter = Rouge::Formatters::HTML.new(highlighter_options)
          inner_content = pygments_wrap formatter.format(has_filepath ? lexed_code[1..-1] : lexed_code).strip, highlighter_options[:css_class]
          source_window inner_content, 'Editor: ' + filepath
        end

        def extract_filepath_if_present(lexed_code)
          first_token_type, first_token_content = lexed_code.first

          if comment_token?(first_token_type)
            # Bad that I am specifying the comment to strip ... this does not port
            [ remove_comment(lexed_code), create_title_from_comment(first_token_content), true ]
          else
            [ lexed_code, default_filename, false ]
          end
        end

        # Sometimes the token type is Token.Comment.Single or Token.Comment
        def comment_token?(token)
          token.name == :Comment || token.parent.name == :Comment
        end

        def remove_comment(lexed_code)
          lexed_code.to_a[1..-1]
        end

        # TODO: Currently this will only remove comments that look like:
        #   ruby single line comment or an HTML comment.
        #
        #   # path/to/filename.rb
        #   OR
        #   <!-- path/to/filename.erb -->
        def create_title_from_comment(content)
          content.gsub(/^\s*(?:#|<!--)\s*/,"").gsub(/\s*-->\s*$/,"")
        end

        def default_filename
          "Untitled"
        end

        def pygments_wrap(content,css_class)
          "<div class='#{css_class}'><pre>#{content}</pre></div>"
        end

        def source_window(content,filepath)
          %{<div class="window">
              <nav class="control-window">
                <div class="close">&times;</div>
                <div class="minimize"></div>
                <div class="deactivate"></div>
              </nav>
              <h1 class="titleInside">#{filepath}</h1>
              <div class="container"><div class="editor">#{content}</div></div></div>}
        end
      end

    end
  end
end
