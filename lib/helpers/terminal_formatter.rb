module Middleman
  module Syntax
    module Highlighter

      class TerminalFormatter
        def render(lexed_code, highlighter_options)
          lexed_code, working_dir = find_working_dir(lexed_code)
          prompt_content = promptize(lexed_code)
          terminal_window prompt_content, "Terminal: " + working_dir
        end

        def find_working_dir(lexed_code)
          first_token_type, first_token_content = lexed_code.first

          if first_token_type.name == :Comment || first_token_type.parent.name == :Comment
            [ trim_comment(lexed_code), first_token_content.gsub(/^#+\s*/,"").strip ]
          else
            [ lexed_code, default_working_dir ]
          end
        end

        def trim_comment(lexed_code)
          lexed_code.to_a[1..-1]
        end

        def default_working_dir
          "~/"
        end

        require 'cgi'

        def promptize(content)

          gutters = []
          lines_of_code = []
          buffer = ""
          # unroll the content into a single text buffer
          content.each do |token,text|
            buffer += text
          end
          # process escape characters & split into lines
          lines = CGI.escapeHTML(buffer.strip).split("\n")
          # process each line
          lines.each do |line|
            if line.length > 1 && line[0] == '$'
              # begins with prompt, so push $ onto gutter and add the remaining
              # line to the lines of code
              gutters.push gutter('$')
              lines_of_code.push line_of_code(line.length > 2 ? line[2..-1] : "", true)
            else
              # no gutter, so just push a space onto gutter and add the entire
              # line to the lines of code
              gutters.push gutter("&nbsp;")
              line = "&nbsp;" if line == "" # work-around fact that blank lines are eaten
              lines_of_code.push line_of_code(line, false)
            end
          end

          # gutters = []
          # lines_of_code = []
          # last_token_was_a_prompt = false
          # last_token_was_an_escape = false
          # current_line = ""
          # saw_echo = false
          #
          # # lines_of_content = content.strip.lines
          # content.each do |token,text|
          #   next if text == "\n"
          #   #   lines_of_code.push newline
          #   #   next
          #   # end
          #
          #   #binding.pry
          #   if text == "echo"
          #     saw_echo = true
          #   end
          #
          #   if token.name == :Prompt
          #     last_token_was_a_prompt = true
          #     gutters.push gutter(current_line + text.strip)
          #     current_line = ""
          #   elsif token.name == :Escape
          #     lines_of_code.push "<span class='escape'>current_line + #{text.strip}</span>"
          #     last_token_was_an_escape = true
          #     current_line = ""
          #   elsif token.name == :Operator || token.name == :Keyword || token.name == :Builtin || token.name == :Single
          #     current_line += text
          #   else
          #     lines = text.strip.split("\n")
          #
          #     if token.name != :Text
          #       binding.pry
          #     end
          #
          #     line = lines.first
          #     if (line)
          #       line = current_line + line
          #     elsif current_line != ""
          #       line = current_line
          #     end
          #     current_line = ""
          #
          #     lines_of_code.push line_of_code(line, last_token_was_a_prompt || last_token_was_an_escape)
          #
          #     if lines.length > 1
          #       lines[1..-1].each { |line| lines_of_code.push line_of_code(line,false) }
          #
          #       if last_token_was_a_prompt
          #         if saw_echo
          #           #binding.pry
          #         end
          #         lines[1..-1].each { |line| gutters.push gutter("&nbsp;") }
          #       else
          #         lines.each { |line| gutters.push gutter("&nbsp;") }
          #       end
          #     end
          #
          #     last_token_was_a_prompt = false
          #     last_token_was_an_escape = false
          #   end
          #
          # end

          table = "<table><tr>"
          table += "<td class='gutter'><pre class='line-numbers'>#{gutters.join("")}</pre></td>"
          table += "<td class='code'><pre><code>#{lines_of_code.join("")}</code></pre></td>"
          table += "</tr></table>"
        end


        def command_character
          "$"
        end

        def gutter(line)
          gutter_value = line.start_with?(command_character) ? command_character : "&nbsp;"
          "<span class='line-number'>#{gutter_value}</span>"
        end

        def line_of_code(line,command)
          if command
            line_class = "command"
            # line = line.strip
          else
            line_class = "output"
          end
          if line
            "<span class='line #{line_class}'>#{line}</span>"
          else
            ""
          end
        end

        def terminal_window(content,filepath)
          %{<div class="window">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">#{filepath}</h1>
            <div class="container"><div class="terminal">#{content}</div></div>
          </div>}
        end
      end

    end
  end
end
