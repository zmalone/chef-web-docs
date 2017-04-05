module Middleman
  module Syntax
    module Highlighter

      class TerminalFormatter
        def initialize(options = {:prompt => "$", :title_prefix => "Terminal", :window_style => "", :default_working_dir => "~" })
          @prompt = options[:prompt]
          @title_prefix = options[:title_prefix]
          @window_style = options[:window_style]
          @default_working_dir = options[:default_working_dir]
        end

        def render(lexed_code, highlighter_options, style_options = {})
          lexed_code, working_dir = find_working_dir(lexed_code)
          prompt_content = promptize(lexed_code)
          terminal_window prompt_content, @title_prefix + ": " + working_dir
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
          @default_working_dir
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
          in_command = false
          lines.each do |line|
            if line.length > 1 && line.start_with?('$ ')
              # begins with prompt, so push prompt character onto gutter and add the remaining
              # line to the lines of code
              gutters.push gutter(@prompt)
              line = line.length > 2 ? line[2..-1] : ""
              lines_of_code.push line_of_code(line, true, false)
              in_command = is_continuation?(line)
            else
              # no gutter, so just push a space onto gutter and add the entire
              # line to the lines of code
              gutters.push gutter("&nbsp;")
              line = "&nbsp;" if line == "" # work-around fact that blank lines are eaten
              line = "[...]" if line =~ /\[TRIMMED_OUTPUT\]/
              lines_of_code.push line_of_code(line, in_command, !in_command && line == "[...]")
              in_command = in_command && is_continuation?(line)
            end
          end

          table = "<table><tr>"
          table += "<td class='gutter'><pre class='line-numbers'>#{gutters.join("")}</pre></td>"
          table += "<td class='code'><pre><code>#{lines_of_code.join("")}</code></pre></td>"
          table += "</tr></table>"
        end

        def is_continuation?(line)
          # \ is Linux; ` is Windows PowerShell
          line = line.strip
          line.end_with?('\\') || line.end_with?('\`')
        end

        def command_character
          @prompt
        end

        def gutter(line)
          gutter_value = line.start_with?(command_character) ? command_character : "&nbsp;"
          "<span class='line-number'>#{gutter_value}</span>"
        end

        def line_of_code(line,command,is_truncation)
          if command
            line_class = "command"
          elsif is_truncation
            line_class = "output truncated-output"
          else
            line_class = "output"
          end
          if line
            # TODO: A bit of a hack, but I want to be able to highlight commands from SSH connections.
            # Can come back and rethink this more fully later.
            if m = line.match(/(\[?.+@.+\s?~\]?\$\s?)(.*)/)
              "<span style='display: inline;' class='line-number'>#{m[1]}</span><span style='display: inline;' class='line command'>#{m[2]}</span><br>"
            # Powershell. Example:
            # C:\dev\packer-templates [master]>
            elsif m = line.match(/(\w:\\.*\s+\[.+?\]&gt;)(\s+.*)/)
              "<span style='display: inline;' class='line-number'>#{m[1]}</span><span style='display: inline;' class='line command'>#{m[2]}</span><span class='line #{line_class}'></span>"
            # TODO: A variation of the above (example: root@079f902cf103:/home/test_user $)
            elsif m = line.match(/(\[?.+@.+:.+\s?\$\s?)(.*)/)
              "<span style='display: inline;' class='line-number'>#{m[1]}</span><span style='display: inline;' class='line command'>#{m[2]}</span><br>"
            # TODO: Perhaps another hack. The intention here is to highlight Git prompts (for example, "users git:(master) $").
            elsif m = line.match(/(.+\sgit:\(.+\)\s\$\s)(.*)/)
              "<span style='display: inline;' class='line-number'>#{m[1]}</span><span style='display: inline;' class='line command'>#{m[2]}</span><span class='line #{line_class}'></span>"
            else
              "<span class='line #{line_class}'>#{line}</span>"
            end
          else
            ""
          end
        end

        def terminal_window(content,filepath)
<<-EOH
<div class="window #{@window_style}">
  <nav class="control-window">
    <div class="close">&times;</div>
    <div class="minimize"></div>
    <div class="deactivate"></div>
    </nav>
  <h1 class="titleInside">#{filepath}</h1>
  <div class="container"><div class="terminal">#{content}</div></div>
</div>
EOH
        end
      end

    end
  end
end
