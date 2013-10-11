require 'redcarpet'

class Redcarpet::Render::HTML
  # https://github.com/bhollis/middleman/blob/7be0590acf/middleman-core/lib/middleman-core/renderers/redcarpet.rb#L35-L41
  attr_accessor :middleman_app

  def preprocess(document)
    ZurbFoundation.pre_hooks(document, app: middleman_app)
  end

  def postprocess(document)
    ZurbFoundation.post_hooks(document, app: middleman_app)
  end
end

module ZurbFoundation
  extend self

  def pre_hooks(content, options = {})
    @content = content
    @app = options[:app]

    videos

    return @content
  end

  def post_hooks(content, options = {})
    @content = content
    @app = options[:app]

    alerts
    anchors

    return @content
  end

  private
  def app
    @app || raise("No app was defined!")
  end

  def content
    @content
  end

  def alerts
    content.gsub!(/<p>\[INFO\] (.+)<\/p>/)     { "<div class=\"alert-box\"><i class=\"icon-exclamation-sign\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[SUCCESS\] (.+)<\/p>/)  { "<div class=\"alert-box success\"><i class=\"icon-ok-sign\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[WARN\] (.+)<\/p>/)     { "<div class=\"alert-box alert\"><i class=\"icon-warning-sign\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[NOTE\] (.+)<\/p>/)     { "<div class=\"alert-box secondary\"><i class=\"icon-info-sign\"></i> #{$1}</div>" }
  end


  def anchors
    content.gsub!(/<h([0-9])>(.*)<\/h[0-9]>/) do
      size = $1
      old = $2
      flat = old.downcase.delete(' ')
      escaped = flat.gsub(/\W/, "")
      "<h#{size}><a name=\"#{escaped}\"></a>#{old}</h#{size}>"
    end
  end

  def videos
    content.gsub!(/\[VIDEO ([\w\d\:\/\.]+)\]/) { "<a href=\"#{$1}\" target=\"_TOP\"><i class=\"icon-youtube-sign\"></i></a>" }
  end

  def render(string)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    return markdown.render(string.to_s.strip).gsub(/<\/?p>/, '').strip
  end
end
