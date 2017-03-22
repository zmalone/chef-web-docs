require 'middleman'
require 'pathname'

class Middleman::Sitemap::Store
  def root
    self.resources.select { |resource| resource.root? }
  end

  def roots
    index.children.select { |child| child.page? }.sort
  end

  private

    def index
      self.find_resource_by_path('/index.html')
    end

end

class Middleman::Sitemap::Resource
  def id
    return self.data.id if self.data.id
    self.url.sub(/\/(modules\/|tracks\/)?/, '')
  end

  def title
    parents(true).map { |page| page.data.ignore_breadcrumb ? '' : (page.data.toc_title || page.data.title) }.compact.join(' - ').presence
  end

  def toc_title
    self.data.short_title || self.data.title
  end

  def root?
    self.page? && !self.path.include?('/') && self.path != 'index.html'
  end

  def children?
    !self.children.empty?
  end

  def children
    @children_cache ||= super.sort
  end

  def parent
    @parent_cache ||= super
  end

  def parents(include_self = false)
    parents = []

    current = include_self ? self : self.parent
    until current.nil?
      parents.push current
      current = current.parent
    end

    parents.pop # remove root level
    parents
  end

  def previous_page
    siblings = self.parent.children
    siblings[siblings.find_index(self) - 1]
  end

  def next_page
    siblings = self.parent.children
    siblings[siblings.find_index(self) + 1]
  end

  def first_page
    siblings = self.parent.children
    siblings.first
  end

  def last_page
    siblings = self.parent.children
    siblings.last
  end

  def page?
    self.ext == '.html' && !self.data['title'].blank?
  end

  def current?(receiver)
    self == receiver.current_page || self.children.any? { |child| child.current?(receiver) }
  end

  def no_index?
    self.data.meta_tags && self.data.meta_tags.any? {|h| h[:content].include?('NOINDEX') }
  end

  def appendix?
    self.data.appendix == true
  end

  def minutes
    return unless self.data.time_to_complete
    data = self.data.time_to_complete.match(/^([\d]+)(-([\d]+))?\s(minutes?|hours?)$/)
    return unless data
    range_min = data[1].to_i
    range_max = (data[3]) ? data[3].to_i : range_min
    return [range_min, range_max] unless data[4].start_with? 'hour'
    [range_min * 60, range_max * 60]
  end

  def <=>(other_resource)
    [self.data['order'].to_i, (self.title || '').downcase] <=> [other_resource.data['order'].to_i, (other_resource.title || '').downcase]
  end

  def method_missing(m, *args, &block)
    meth = m.to_s
    if meth =~ /_child\?$/
      # quickstart_child?, common_use_cases_child?, etc.
      parent = meth.gsub('_child?', '').gsub('_', '-')
      self.page? && !self.store.roots.include?(self) && self.path.include?("#{parent}/")
    else
      super
    end
  end
end
