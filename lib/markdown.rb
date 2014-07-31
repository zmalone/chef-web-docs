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
    extras

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
    content.gsub!(/<p>\[INFO\] (.+)<\/p>/)     { "<div class=\"alert-box\"><i class=\"fa fa-exclamation-triangle\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[SUCCESS\] (.+)<\/p>/)  { "<div class=\"alert-box success\"><i class=\"fa fa-thumbs-o-up\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[WARN\] (.+)<\/p>/)     { "<div class=\"alert-box alert\"><i class=\"fa fa-warning\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[NOTE\] (.+)<\/p>/)     { "<div class=\"alert-box secondary\"><i class=\"fa fa-info-circle\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[DOCS\] (.+)<\/p>/)     { "<div class=\"alert-box docs\"><i class=\"fa fa-book\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[CONCEPT\] (.+)<\/p>/)  { "<div class=\"alert-box concept\"><i class=\"fa fa-info-circle blueiconcolor\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[SIDEBAR\] (.+)<\/p>/)  { "<div class=\"alert-box sidebar\"><i class=\"fa fa-comment blueiconcolor fa-2x\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[COMMENT\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><i class=\"fa fa-exclamation-triangle rediconcolor fa-2x\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[WINDOWS\] (.+)<\/p>/)  { "<div class=\"alert-box concept\"><i class=\"fa fa-windows blueiconcolor\"></i> #{$1}</div>" }
    content.gsub!(/<p>\[ERROR\] (.+)<\/p>/)  { "<div class=\"alert-box error\"><i class=\"fa fa-exclamation-triangle rediconcolor fa-2x\"></i> #{$1}</div>" }

  end


  def anchors
    content.gsub!(/<h([0-9])>(.*)<\/h[0-9]>/) do
      size = $1
      old = $2
      flat = old.downcase.delete(' ')
      escaped = flat.gsub(/\W/, "")
      "<h#{size}><a class=\"section-link\" name=\"#{escaped}\" href=\"##{escaped}\">&#167;</a>#{old}</h#{size}>"
    end
  end

  def videos
    content.gsub!(/\[VIDEO ([\w\d\:\/\.]+)\]/) { "<a href=\"#{$1}\" target=\"_TOP\"><i class=\"fa fa-youtube\"></i></a>" }
  end

  def extras
      content.gsub!(/<p>\[TIMETOCOMPLETE\] (.+)<\/p>/) {
      "<div style='float:right; border:1px solid #666; display: inline-block; padding:5px; border-radius:5px; margin:15px;'><center><i class='fa fa-clock-o fa-3x blueiconcolor'></i><br><b>#{$1} minutes</b></center></div>" }
  end

  def render(string)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    return markdown.render(string.to_s.strip).gsub(/<\/?p>/, '').strip
  end
end
