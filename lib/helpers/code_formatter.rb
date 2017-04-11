module Middleman
  module Syntax
    module Highlighter
      class CodeFormatter
        def initialize(options = {:token_offset => 0, :strip_offset => 1})
          @token_offset = options[:token_offset];
          @strip_offset = options[:strip_offset];
        end

        def render(lexed_code, highlighter_options, style_options = {})
          highlighter_options.merge!(:line_numbers => true)
          lexed_code, filepath, has_filepath = extract_filepath_if_present(@token_offset, lexed_code)
          formatter = Rouge::Formatters::HTMLLegacy.new(highlighter_options)
          inner_content = pygments_wrap formatter.format(has_filepath ? lexed_code[@strip_offset..-1] : lexed_code).strip, highlighter_options[:css_class]
          source_window inner_content, 'Editor: ' + filepath, style_options[:window_style]
        end

        def extract_filepath_if_present(token_offset, lexed_code)
          token_type, token_content = lexed_code.take(token_offset + 1).last

          if comment_token?(token_type)
            # Bad that I am specifying the comment to strip ... this does not port
            [ remove_comment(token_offset, lexed_code), create_title_from_comment(token_content), true ]
          else
            [ lexed_code, default_filename, false ]
          end
        end

        # Sometimes the token type is Token.Comment.Single or Token.Comment
        def comment_token?(token)
          token.name == :Comment || token.parent.name == :Comment
        end

        def remove_comment(token_offset, lexed_code)
          a = lexed_code.to_a
          a.delete_at(token_offset)
          a
        end

        # TODO: Currently this will only remove comments that look like:
        #
        #   # path/to/filename.rb
        #   OR
        #   <!-- path/to/filename.erb -->
        #   OR
        #   -- path/to/filename.sql
        #   OR
        #   // path/to/filename.php
        #   OR
        #   ; path/to/filename.ini
        def create_title_from_comment(content)
          content.gsub(/^\s*(?:#|;|<!--|--|\/\/)\s*/,"").gsub(/\s*-->\s*$/,"")
        end

        def default_filename
          "Untitled"
        end

        def pygments_wrap(content,css_class)
          "<div class='#{css_class}'><pre class='code_wrapper'>#{content}</pre></div>"
        end

        def source_window(content,filepath,window_style)
<<-EOH
<div class="window #{window_style}" ng-non-bindable>
  <nav class="control-window">
    <div class="close">&times;</div>
    <div class="minimize"></div>
    <div class="deactivate"></div>
  </nav>
  <h1 class="titleInside">#{filepath}</h1>
  <div class="container">
    <div class="editor">#{content}
    </div>
  </div>
</div>
EOH
        end
      end

    end
  end
end
