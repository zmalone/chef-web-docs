module PageHelper
  # Remove additional extensions from the filename before calling
  # E.g. index.html -> index.html, index.html.md -> index.html, index.html.md.erb -> index.html
  def sanitize_path(path)
    path.sub(/(\.[\w]+)[\.\w]*$/, '\\1') if path
  end

  # Call sitemap.find_resource_by_path after sanitizing path
  def find_page_by_path(filepath)
    path = sanitize_path(filepath)
    page = sitemap.find_resource_by_path(path)
    logger.warn "WARN: Unable to find page #{filepath}" if page.blank?
    page
  end

  def find_pages_by_folder(folder)
    # logger.info "Find page in folder '#{folder}'"
    pages = []
    data.tree[folder].map do |item|
      extract_filepaths_from_tree(item.last).each do |filepath|
        pages << find_page_by_path(filepath)
      end
    end
    pages.compact
  end

  def extract_filepaths_from_tree(hash)
    filepaths = []
    values = hash.to_hash.values
    values.each do |val|
      if val.respond_to? :to_hash
        filepaths.concat(extract_filepaths_from_tree(val))
      else
        filepaths << val
      end
    end
    filepaths
  end

  # Find a page by the ID attribute in the frontmatter data
  # TODO: Do some profiling on this, and consider adding caching if there's a performance problem
  def find_page_by_id(folder, id)
    page = find_pages_by_folder(folder).map { |page|
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
    return (match) ? match[1] : ''
  end

  def get_page_id(page)
    if (page.data.id)
      return page.data.id
    end

    match = page.url.match(/^\/?(modules|tracks)\/(.+)$/)
    return if !match
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

  def find_track(page)
    module_id = find_root_id(page)
    track = find_pages_by_folder('tracks').select { |page|
      if !page.blank? && page.data.modules
        page.data.modules.select { |id|
          id == module_id
        }.any?
      end
    }.first
    logger.warn "WARN: Unable to find track for '#{page.url}'" if track.blank?
    track
  end

  def find_root_id(page)
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

  def calculate_elapsed_time(page)
    if page.data && page.data.time_to_complete
      range = parse_time(page.data.time_to_complete)
    end
  end

  def parse_time(time_string)
    if time_string
      data = time_string.match(/^([\d]+)(-([\d]+))?\s(minutes?|hours?)$/)
      range_min = data[1].to_i
      range_max = (data[3]) ? data[3].to_i : range_min
      if data[4].start_with? 'hour'
        range = [range_min * 60, range_max * 60]
      else
        range = [range_min, range_max]
      end
    end
  end

  def get_content_nav_bar_info(current_page)
    output = {'current_track':nil, 'current_module':nil, 'current_env': nil, 'current_chef_env': nil}
    output['current_track'] = find_track(current_page)
    pages = [current_page]
    pages.unshift pages.first.parent while pages.first.parent
    if(!pages[0].nil?)
      output['current_module'] = pages[0]
    end
    if(!pages[1].nil?)
      output['current_env'] = pages[1]
    end
    if(!pages[2].nil?)
      output['current_chef_env'] = pages[2]
    end
    return output
  end
end
