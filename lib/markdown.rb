require 'html/pipeline'

module Markdown
  extend self

  def parse(content)
    pipeline.call(content)[:output].to_s
  end

  private
  def pipeline
    @pipeline ||= HTML::Pipeline.new([
      HTML::Pipeline::MarkdownFilter,
      HTML::Pipeline::AutolinkFilter,
      HTML::Pipeline::ImageMaxWidthFilter,
      HTML::Pipeline::SyntaxHighlightFilter,
      HTML::Pipeline::AbsoluteImageFilter
    ], context)
  end

  def context
    {
      asset_root: File.expand_path('source/assets'),
      base_url:   File.expand_path('build/assets'),
      gfm:        true
    }
  end
end


require 'uri'

module HTML
  class Pipeline
    class AbsoluteImageFilter < Filter
      def call
        doc.search('img').each do |img|
          unless img['src'].nil?
            src = img['src'].strip

            if src.start_with? '.'
              img['src'] = File.expand_path File.join(context[:base_url], src)
            end
          end
        end

        doc
      end
    end
  end
end
