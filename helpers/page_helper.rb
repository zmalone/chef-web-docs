module PageHelper
  # Remove additional extensions from the filename before calling
  # E.g. index.html -> index.html, index.html.md -> index.html, index.html.md.erb -> index.html
  def sanitize_path(path)
    path.sub(/(\.[\w]+)[\.\w]*$/, '\\1')
  end

  # Call sitemap.find_resource_by_path after sanitizing path
  def find_page_by_path(filepath)
    path = sanitize_path(filepath)
    page = sitemap.find_resource_by_path(sanitize_path(path))
    logger.warn "WARN: Unable to find page #{path}" if page.blank?
    page
  end

  def find_pages_by_folder(folder)
    # logger.info "Find page in folder '#{folder}'"
    data.tree[folder].map do |item|
      item.last.values.first
    end
  end

  # Find a page by the ID attribute in the frontmatter data
  # TODO: Do some profiling on this, and consider adding caching if there's a performance problem
  def find_page_by_id(folder, id)
    page = find_pages_by_folder(folder).map { |item|
      page = find_page_by_path(item)
      (!page.blank? && page.data.id == id) ? page : nil
    }.compact.first
    logger.warn "WARN: Unable to find page '#{id}' in '#{folder}'" if page.blank?
    page
  end

  def find_next_page(page)
    if page.parent && page.parent.data.layout == "lesson-options"
      return page.parent.parent.children.select {|s| s.data.order == page.parent.data.order + 1}.first
    elsif page.children && page.children.first
      return page.children.first
    elsif page.parent && page.parent.children
      next_page = page.parent.children.select {|s| s.data.order == page.data.order + 1}.first
      if next_page != nil && next_page.appendix?
        next_page = nil
      end
      next_page
    end
  end

  def get_page_section(page)
    match = page.url.match(/^\/?(modules|tracks)\/(.+)$/)
    match[1]
  end

  def get_page_id(page)
    if (page.data.id)
      return page.data.id
    end

    match = page.url.match(/^\/?(modules|tracks)\/(.+)$/)
    path = match[2]
    root = find_root(page)
    if root.url != page.url
      if page.parent
        parts = path.split('/')
        thisId = parts.last
        parentId = get_page_id(page.parent)
        return "#{parentId}/#{thisId}"
      end
    end
    path
  end

  def find_root_module(page)
    root = find_root(page)
    get_page_id(root)
  end

  def find_root(page)
    root = page
    while root.parent
      root = root.parent
    end
    root
  end
end
