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
end
