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
            [ trim_comment(lexed_code), first_token_content.gsub(/^#+\s*/,"") ]
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

        def promptize(content)

          gutters = []
          lines_of_code = []
          last_token_was_a_prompt = false
          last_token_was_an_escape = false

          # lines_of_content = content.strip.lines
          content.each do |token,text|
            next if text == "\n"

            if token.name == :Prompt
              last_token_was_a_prompt = true
              gutters.push gutter(text.strip)
            elsif token.name == :Escape
              lines_of_code.push "<span class='escape'>#{text.strip}</span>"
              last_token_was_an_escape = true
            else
              lines = text.strip.split("\n")
              lines_of_code.push line_of_code(lines.first,last_token_was_a_prompt || last_token_was_an_escape)
              if lines.length > 1
                lines[1..-1].each { |line| lines_of_code.push line_of_code(line,false) }
              end

              if last_token_was_a_prompt
                lines[1..-1].each { |line| gutters.push gutter("&nbsp;") }
              else
                lines.each { |line| gutters.push gutter("&nbsp;") }
              end

              last_token_was_a_prompt = false
              last_token_was_an_escape = false
            end

          end

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
            "<span class='line #{line_class}'>#{line.strip}</span>"
          else
            ""
          end
        end

        def terminal_window(content,filepath)
          %{<div class="window">
            <nav class="control-window">
              <a href="#finder" class="close" data-rel="close">close</a>
              <a href="#" class="minimize">minimize</a>
              <a href="#" class="deactivate">deactivate</a>
            </nav>
            <h1 class="titleInside">#{filepath}</h1>
            <div class="container"><div class="terminal">#{content}</div></div>
          </div>}
        end
      end

    end
  end
end
