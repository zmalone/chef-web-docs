require 'lib/helpers/code_formatter'
require 'lib/helpers/default_formatter'
require 'lib/helpers/terminal_formatter'
require 'rouge'

module Middleman
  module Syntax
    module Highlighter

      # A helper module for highlighting code
      def self.highlight(code, language=nil, opts={})
        code.strip!

        return "" if code_block_is_empty?(code)

        # parse out the window style if it was supplied
        unless language.nil?
          v = language.split('-')
          # reassign to just the language part
          language = v[0]
          # get window style
          window_style = v[1]
        end

        format_language = language
        language = language_for_format(language)

        lexer = lexer_for_language_or_code(language,code)

        highlighter_options = options.to_h.merge(opts)
        highlighter_options[:css_class] = [ highlighter_options[:css_class], lexer.tag ].join(' ')
        lexer_options = highlighter_options.delete(:lexer_options)

        lexed_code = lexer.lex(code, lexer_options)

        formatter = formatter_for_language(format_language)
        formatter.render(lexed_code, highlighter_options, { :window_style => window_style })
      end

      def self.lexer_for_language_or_code(language,code)
        Rouge::Lexer.find_fancy(language, code) || Rouge::Lexers::PlainText
      end

      def self.code_block_is_empty?(code)
        code == "" || code == "</div>"
      end

      def self.formatters
        @formatters ||= begin
          hash = { "conf" => CodeFormatter.new,
                   "ruby" => CodeFormatter.new,
                   "html" => CodeFormatter.new,
                   "ini" => CodeFormatter.new,
                   "sql" => CodeFormatter.new,
                   "toml" => CodeFormatter.new,
                   "plaintext" => CodeFormatter.new,
                   "json" => CodeFormatter.new,
                   "yaml" => CodeFormatter.new,
                   "php" => CodeFormatter.new({:token_offset => 2, :strip_offset => 0}),
                   "powershell" => CodeFormatter.new,
                   "bash" => TerminalFormatter.new,
                   "shell" => CodeFormatter.new,
                   "ps" => TerminalFormatter.new({:prompt => "PS >", :title_prefix => "Windows PowerShell", :window_style => "Win32", :default_working_dir => "~"}),
                   "cmd" => TerminalFormatter.new({:prompt => ">", :title_prefix => "Command Prompt", :window_style => "Win32", :default_working_dir => "~"})
                 }

          hash.default = DefaultFormatter.new
          hash
        end
      end

      def self.formatter_for_language(language)
        formatters[language]
      end

      # enable the syntax highlight language to differ from the formatter
      def self.language_for_format(language)
        case language
        when 'ps'
          'bash'
        else
          language
        end
      end
    end
  end
end
