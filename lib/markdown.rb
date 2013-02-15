require 'redcarpet'
class Redcarpet::Render::HTML
  def postprocess(document)
    ZurbFoundation.alerts(document)
  end
end

module ZurbFoundation
  extend self

  def alerts(content)
    content.gsub!(/<p>\[INFO\](.*)<\/p>/)     { "<div class=\"alert-box\">#{$1.strip}</div>" }
    content.gsub!(/<p>\[SUCCESS\](.*)<\/p>/)  { "<div class=\"alert-box success\">#{$1.strip}</div>" }
    content.gsub!(/<p>\[WARN\](.*)<\/p>/)     { "<div class=\"alert-box alert\">#{$1.strip}</div>" }
    content.gsub!(/<p>\[NOTE\](.*)<\/p>/)     { "<div class=\"alert-box secondary\">#{$1.strip}</div>" }
    content
  end
end
