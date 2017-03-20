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
    tabs
    modals
    anchors
    extras
    angularize

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
    content.gsub!(/<p>\[INFO\] (.+)<\/p>/)     { "<div class=\"alert-box\"><i class=\"fa fa-2x fa-exclamation-triangle\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[SUCCESS\] (.+)<\/p>/)  { "<div class=\"alert-box success\"><i class=\"fa fa-2x fa-thumbs-o-up\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[WARN\] (.+)<\/p>/)     { "<div class=\"alert-box comment error\"><i class=\"fa fa-2x fa-exclamation-triangle rediconcolor\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[NOTE\] (.+)<\/p>/)     { "<div class=\"alert-box secondary\"><i class=\"fa fa-2x fa-info-circle\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[DOCS\] (.+)<\/p>/)     { "<div class=\"alert-box docs\"><i class=\"fa fa-2x fa-file\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[COMMENT\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><i class=\"fa fa-2x fa-info-circle comment-icon\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[SIDEBAR\] (.+)<\/p>/)  { "<div class=\"alert-box sidebar\"><i class=\"fa fa-2x fa-comment blueiconcolor fa-2x\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[INTERNAL\] (.+)<\/p>/)  { "<div class=\"alert-box internal\"><i class=\"fa fa-2x fa-exclamation-triangle rediconcolor fa-2x\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[WINDOWS\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><i class=\"fa fa-2x fa-windows blueiconcolor\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[LINUX\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><i class=\"fa fa-2x fa-linux\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[ERROR\] (.+)<\/p>/)  { "<div class=\"alert-box error\"><i class=\"fa fa-2x fa-exclamation-triangle rediconcolor fa-2x\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[RUBY\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><img class=\"alert-box-icon-small\" src=\"/assets/images/partner/ruby.svg\"></img>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[TIP\] (.+)<\/p>/)  { "<div class=\"alert-box tip\"><i class=\"fa fa-2x fa-info-circle tip-icon\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[GITHUB\] (.+)<\/p>/)  { "<div class=\"alert-box github\"><i class=\"fa fa-2x fa-github\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[FEEDBACK\] (.+)<\/p>/)  { "<div class=\"alert-box feedback\"><i class=\"fa fa-2x fa-comment-o\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[HEADLINE\] (.+)<\/p>/)  { "<div class=\"alert-box headline\"><span class=\"key-point-label\">KEY POINT: </span>#{$1}</div>" }
    content.gsub!(/<p>\[QUOTE\] (.+)<\/p>/)  { "<div class=\"alert-box quote\"><i class=\"fa fa-quote-left\"></i>&nbsp;<i>#{$1}</i></div>" }
    content.gsub!(/<p>\[AWS\] (.+)<\/p>/)  { "<div class=\"alert-box aws\"><img class=\"alert-box-icon-large\" src=\"/assets/images/partner/AWS-Cloud.svg\"></img>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[CLOUD\] (.+)<\/p>/)  { "<div class=\"alert-box tip\"><i class=\"fa fa-2x fa-cloud blueiconcolor\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[TRAINING\] (.+)<\/p>/)  { "<div class=\"alert-box training\"><i class=\"fa fa-2x fa-laptop training-icon\"></i>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[PRODNOTE\] (.+)<\/p>/)  { "<div class=\"alert-box prod-note\"><i class=\"fa fa-2x fa-sticky-note-o prod-note-icon\"></i>&nbsp; <span class=\"prod-note-label\">PRODUCTION:</span>&nbsp; #{$1}</div>" }
    content.gsub!(/<p>\[SKILL\] (.+)<\/p>/)  { "<div class=\"alert-box comment\"><i class=\"fa fa-2x fa-flask  comment-icon\"></i>&nbsp; #{$1}</div>" }
  end

  # we currently can't have ERB in partials, so we subsitute text for now.
  def tabs
    content.gsub!(/<p>\[START_TABS\s+(?<id>\w+)\s+(?<names>.+)\]<\/p>/) {
      id = $1.downcase # TODO: named groups ($~[:id]) not working?
      names = $2.split(/,/)
      active_class = ' active' # set .active class to first element.
      items = []
      names.each { |name|
        escaped_name = name.downcase.delete(' ').gsub(/\W/, "")
        items << "<li class=\"tab-title#{active_class}\"><a href=\"##{id}#{escaped_name}\">#{name}</a></li>"
        active_class = ''
      }
      '<ul class="tabs" data-tab>' + items.join + '</ul>' + '<div class="tabs-content">'
    }

    content.gsub!(/<p>\[END_TABS\]/) {
      "</div>"
    }

    content.gsub!(/<p>\[START_TAB\s+(\w+)(\s+(\w+))?\]<\/p>(.+?)<p>\[END_TAB\]<\/p>/m) {
      content = $4
      active_class = $2
      escaped_name = $1.downcase.delete(' ').gsub(/\W/, "")
      "<div class=\"content #{active_class}\" id=\"#{escaped_name}\"><p>#{content}</p></div>"
    }
  end

  def modals
    content.gsub!(/<p>\[START_MODAL\s+([\w-]+)(\s+(.+?))?\]<\/p>(.+?)<p>\[END_MODAL\]<\/p>/m) {
      content = $4
      title = $2
      id = $1
      <<-EOH
      <a class="button radius cta" href="#" data-reveal-id="#{id}">#{title}</a>
      <div id="#{id}" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
      #{content}
      <a class="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>
      EOH
    }
  end

  def anchors
    content.gsub!(/<h([0-9])>(.*)<\/h[0-9]>/) do
      size = $1
      old = $2
      flat = old.downcase.delete(' ')
      escaped = flat.gsub(/\W/, "")
      s = ''
      # if the title looks like a step, create an additional anchor, e.g. #step2
      m = /\A(?<step>\d+(?:\.\d)*)\./.match(flat)
      step = m.nil? ? nil : "step#{m['step']}"
      s += "<a name=\"#{step}\" href=\"##{step}\"></a>" unless step.nil?
      # create a second anchor for the long form and link it to the step anchor if it exists; otherwise, link to the long form
      s += "<h#{size}>#{old}"
      s += "<span class=\"section-links\"><a class=\"section-link\" name=\"#{escaped}\" href=\"##{step || escaped}\"><i class=\"fa fa-paragraph\"></i></a><a class=\"section-link\" name=\"#top\" href=\"#top\"><i class=\"fa fa-long-arrow-up\"></i></a></span>" unless old.match /fa\-paragraph/
      s += "</h#{size}>"
      s
    end
  end

  def videos
    content.gsub!(/\[VIDEO ([\w\d\:\/\.]+)\]/) { "<a href=\"#{$1}\" target=\"_TOP\"><i class=\"fa fa-youtube\"></i></a>" }
  end

  def extras
      content.gsub!(/<p>\[TIMETOCOMPLETE\] (.+)<\/p>/) {
      "<div style='float:right; border:1px solid #666; display: inline-block; padding:5px; border-radius:5px; margin:15px;'><center><i class='fa fa-clock-o fa-3x blueiconcolor'></i><br><b>#{$1} minutes</b></center></div>" }

      content.gsub!(/<p>\[START_BOX\]<\/p>\s*(.+?)\s*<p>\[END_BOX\]<\/p>/m) {
      $1 }
  end

  def angularize
    # Angular does not support horizontal rules within paragraphs. If it's an empty paragraph, as
    # generated by Markdown, it's easy to find and fix. If the paragraph isn't empty, it gets much more
    # complex, and this may need to be flagged as a TODO.
    # TODO: Review this and determine if additional rules are necessary, or if there is an alternative to this.
    content.gsub!('{', "[OPENINGCURLY]")
    content.gsub!('}', "{{ '}' }}")
    content.gsub!('[OPENINGCURLY]', "{{ '{' }})")
    content.gsub!(/<p><hr\s?\/?><\/p>/, '<hr>')
    content.gsub!(/<script[^>]*>[^<]*<\/script>/, '')
    content.gsub!('<p/>', '')
  end

  def render(string)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    return markdown.render(string.to_s.strip).gsub(/<\/?p>/, '').strip
  end
end
