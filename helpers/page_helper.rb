module PageHelper
  # Takes a raw filesystem path and returns a path as used by Middleman's internal sitemap, without
  # additional extensions, and skipping partials.
  # E.g. index.html -> index.html, index.html.md -> index.html, index.html.md.erb -> index.html
  # E.g. _index.erb -> nil
  def get_sitemap_path(path)
    return unless path.is_a? String
    return if path.match(/\/_[^\/]+$/)
    path.sub(/(\.[\w]+)[\.\w]*$/, '\\1')
  end

  # Call sitemap.find_resource_by_path after formatting the path to match Middleman sitemap standard
  def find_page_by_path(filepath)
    path = get_sitemap_path(filepath)
    page = sitemap.find_resource_by_path(path) unless path.blank?
    logger.warn "WARN: Unable to find page #{filepath}" if !path.nil? && page.blank?
    page
  end

  def find_pages_by_folder(folder, depth = -1)
    # logger.info "Find page in folder '#{folder}'"
    pages = []
    data.tree[folder].map do |item|
      extract_filepaths_from_tree(item.last, depth).each do |filepath|
        pages << find_page_by_path(filepath)
      end
    end
    pages.compact
  end

  def extract_filepaths_from_tree(hash, max_depth = -1, current_depth = 0)
    filepaths = []
    if max_depth == -1 || max_depth > current_depth
      current_depth = current_depth + 1
      values = hash.to_hash.values
      values.each do |val|
        if val.respond_to? :to_hash
          filepaths.concat(extract_filepaths_from_tree(val, max_depth, current_depth + 1))
        else
          filepaths << val
        end
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

  def get_page_duration(page)
    module_match = page.source_file.match(/\/modules\/(.+)/)
    return nil if !module_match
    module_path = module_match[1]
    parts = module_path.split('/')
    module_folder = parts[0]
    tree = restructure_tree(data.tree.modules[module_folder])
    current_tree = filter_tree_by_path(tree, module_match[0])
    all = tree_calculate_time(tree)
    remaining = tree_calculate_time(current_tree)
    {
        all: all,
        remaining: remaining
    }
  end

  def restructure_tree(tree_hash)
    keys = tree_hash.keys
    child_keys = keys.reject { |key| key =~ /\./ }
    index_path = tree_hash[keys.select { |key| key =~ /^index\./ }.first]
    if child_keys.count > 0
      keys = child_keys
    end
    unless index_path.nil?
      child_items = []
      keys.each do |page_key|
        if tree_hash[page_key].respond_to? :keys
          child_items << restructure_tree(tree_hash[page_key])
        end
      end
      child_items = child_items.compact
      is_fork = false
      child_items.each do |child_item|
        is_fork = true if child_item[:children].count > 0
        child_item[:order] = 0
        page = find_page_by_path(child_item[:path])
        if page && page.data && page.data.order
          child_item[:order] = page.data.order
        end
      end
      child_items.sort_by! do |a|
        a[:order]
      end
      {
        path: index_path,
        children: child_items,
        is_fork: is_fork
      }
    end
  end

  def filter_tree_by_path(tree, filepath)
    if tree[:path] == filepath
      tree
    else
      found = []
      tree[:children].each do |child|
        if found.count == 0
          tree_by_path = filter_tree_by_path(child, filepath)
          if tree_by_path && tree_by_path[:filtered]
            return tree_by_path
          elsif tree_by_path
            found << tree_by_path
          end
        else
          found << child
        end
      end
      if found.count > 0
        return {
          filtered: true,
          children: found
        }
      end
      nil
    end
  end

  def tree_calculate_time(tree)
    return tree[:time_to_complete] if tree[:time_to_complete]

    page = find_page_by_path(tree[:path])
    range = get_time_to_complete(page)

    unless range
      range = [0, 0]
      tree[:children].each do |child|
        child_range = tree_calculate_time(child)
        # Are we adding the child times? Or finding the extended range (forks)?
        if child_range
          if tree[:is_fork]
            range[0] = (range[0] > 0) ? [range[0], child_range[0]].min : child_range[0]
            range[1] = [range[1], child_range[1]].max
          else
            range[0] = range[0] + child_range[0]
            range[1] = range[1] + child_range[1]
          end
        end
      end
    end

    tree[:time_to_complete] = range
  end

  def get_time_to_complete(page)
    if page && page.data && page.data.time_to_complete
      parse_time(page.data.time_to_complete)
    end
  end

  def parse_time(time_string)
    if time_string
      data = time_string.match(/^([\d]+)(-([\d]+))?\s(minutes?|hours?)$/)
      if data
        range_min = data[1].to_i
        range_max = (data[3]) ? data[3].to_i : range_min
        if data[4].start_with? 'hour'
          [range_min * 60, range_max * 60]
        else
          [range_min, range_max]
        end
      end
    end
  end
end
