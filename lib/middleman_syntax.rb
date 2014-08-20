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

        format_language = language
        language = language_for_format(language)

        lexer = lexer_for_language_or_code(language,code)

        highlighter_options = options.to_h.merge(opts)
        highlighter_options[:css_class] = [ highlighter_options[:css_class], lexer.tag ].join(' ')
        lexer_options = highlighter_options.delete(:lexer_options)

        lexed_code = lexer.lex(code, lexer_options)

        formatter = formatter_for_language(format_language)
        formatter.render(lexed_code, highlighter_options)
      end

      def self.lexer_for_language_or_code(language,code)
        Rouge::Lexer.find_fancy(language, code) || Rouge::Lexers::PlainText
      end

      def self.code_block_is_empty?(code)
        code == "" || code == "</div>"
      end

      def self.formatters
        @formatters ||= begin
          hash = { "ruby" => CodeFormatter.new,
                   "html" => CodeFormatter.new,
                   "bash" => TerminalFormatter.new,
                   "shell" => TerminalFormatter.new,
                   "ps" => TerminalFormatter.new({:prompt => "PS >", :title_prefix => "Windows PowerShell"})
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
