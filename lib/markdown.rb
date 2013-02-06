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
      HTML::Pipeline::MentionFilter,
      HTML::Pipeline::EmojiFilter,
      HTML::Pipeline::SyntaxHighlightFilter
    ], context)
  end

  def context
    {
      asset_root: 'http://your-domain.com/where/your/images/live/icons',
      base_url:   'http://your-domain.com',
      gfm:        true
    }
  end
end
