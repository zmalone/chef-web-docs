module Middleman
  module Syntax
    module Highlighter

      # A helper module for highlighting code
      def self.highlight(code, language=nil, opts={})
        lexer = Rouge::Lexer.find_fancy(language, code) || Rouge::Lexers::PlainText

        code = code.strip

        highlighter_options = options.to_h.merge(opts)
        highlighter_options[:css_class] = [ highlighter_options[:css_class], lexer.tag ].join(' ')
        lexer_options = highlighter_options.delete(:lexer_options)

        # why </div> why?
        if code.strip == "" || code.strip == "</div>"
          ""
        elsif lexer.tag == "ruby" || lexer.tag == "html"
          code, filepath = find_filepath(code)
          highlighter_options.merge!(:line_numbers => true)
          formatter = Rouge::Formatters::HTML.new(highlighter_options)
          inner_content = pygments_wrap formatter.format(lexer.lex(code, options.lexer_options)), highlighter_options[:css_class]
          source_window inner_content, filepath
        elsif lexer.tag == "shell" || lexer.tag == "bash"
          code, working_dir = find_working_dir(code)
          prompt_content = promptize(code)
          # formatter = Rouge::Formatters::HTML.new(highlighter_options)
          # inner_content = pygments_wrap formatter.format(lexer.lex(code, options.lexer_options)), highlighter_options[:css_class]
          terminal_window prompt_content, working_dir
        else
          formatter = Rouge::Formatters::HTML.new(highlighter_options)
          pygments_wrap formatter.format(lexer.lex(code, options.lexer_options)), highlighter_options[:css_class]
        end
      end

      def self.promptize(content)
        lines_of_content = content.strip.lines
        gutters = lines_of_content.map { |line| gutter(line) }
        lines_of_code = lines_of_content.map { |line| line_of_code(line) }

        table = "<table><tr>"
        table += "<td class='gutter'><pre class='line-numbers'>#{gutters.join("\n")}</pre></td>"
        table += "<td class='code'><pre><code>#{lines_of_code.join("")}</code></pre></td>"
        table += "</tr></table>"
      end

      def self.command_character
        "$"
      end

      def self.gutter(line)
        gutter_value = line.start_with?(command_character) ? command_character : "&nbsp;"
        "<span class='line-number'>#{gutter_value}</span>"
      end

      def self.line_of_code(line)
        if line.start_with?(command_character)
          line_class = "command"
          line = line.sub(command_character,'').strip
        else
          line_class = "output"
        end
        "<span class='line #{line_class}'>#{line}</span>"
      end

      def self.pygments_wrap(content,css_class)
        "<div class='#{css_class}'><pre>#{content}</pre></div>"
      end

      def self.find_filepath(code)
        code_lines = code.split("\n")
        if code_lines.first.start_with?("#")
          [ code_lines[1..-1].join("\n"), code_lines.first.split("#",2).last ]
        else
          [ code, "Random File" ]
        end
      end

      def self.find_working_dir(code)
        code_lines = code.split("\n")
        if code_lines.first.start_with?("#")
          [ code_lines[1..-1].join("\n"), code_lines.first.split("#",2).last ]
        else
          [ code, "~/chef_repo" ]
        end
      end

      def self.source_window(content,filepath)
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

      def self.terminal_window(content,filepath)
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