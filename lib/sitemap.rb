require 'middleman'
require 'pathname'

class Middleman::Sitemap::Store
  def root
    self.resources.select { |resource| resource.root? }
  end
end

class Middleman::Sitemap::Resource
  def root?
    self.page? && !self.path.include?('/') && self.path != 'index.html'
  end

  def children?
    !self.children.empty?
  end

  def children
    super.sort
  end

  def page?
    self.ext == '.html' && !self.data['title'].blank?
  end

  def current?(receiver)
    self == receiver.current_page || self.children.any? { |child| child.current?(receiver) }
  end

  def <=>(other_resource)
    (self.data['order'] || '0') <=> (other_resource.data['order'] || '0')
  end
end
