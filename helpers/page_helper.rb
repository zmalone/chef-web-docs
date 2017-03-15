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
      if page.data.order
        next_page = page.parent.children.select {|s| s.data.order == page.data.order + 1}.first
      else
        next_page = page.parent.children.first
      end
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
    if page.data.id
      return page.data.id
    end

    page.url.split('/')[2..-1].join('/')
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
    tree, current_tree = get_module_trees_from_page(page)
    return unless tree && current_tree
    all = tree_calculate_time(tree)
    remaining = tree_calculate_time(current_tree)
    {
        all: all,
        remaining: remaining
    }
  end

  def time_diff_milli(start, finish)
    (finish - start) * 1000.0
  end

  def get_tree_data
    tree = {
      tracks: {},
      modules: {}
    }

    data.tree.modules.keys.each do |module_id|
      module_tree = restructure_tree(data.tree.modules[module_id])
      tree_calculate_time(module_tree)
      tree[:modules].merge!(format_tree_data(module_tree))
    end

    data.tree.tracks.keys.each do |track_id|
      track = restructure_tree(data.tree.tracks[track_id])
      track_calculate_time(track, tree[:modules])
      tree[:tracks].merge!(format_tree_data(track))
    end
    tree
  end

  def track_calculate_time(track, modules)
    track[:minutes] ||= [0, 0]
    track[:modules].each do |module_id|
      range = (modules[module_id] && modules[module_id][:minutes]) ? modules[module_id][:minutes] : [0, 0]
      track[:minutes][0] += range[0]
      track[:minutes][1] += range[1]
    end
  end

  def format_tree_data(tree)
    page_id = tree[:page_id] || get_page_id(tree[:page])
    data = {}
    data[page_id] = {
      url: tree[:page].url
    }
    data[page_id][:minutes] = tree[:minutes] if tree[:minutes]
    data[page_id][:is_fork] = tree[:is_fork] if tree[:is_fork]
    data[page_id][:children] = [] if tree[:children]

    if tree[:children]
      tree[:children].each do |child|
        child_id = child[:page_id] = child[:page_id] || get_page_id(child[:page])
        data[page_id][:children] << child_id
        data.merge!(format_tree_data(child))
      end
    elsif tree[:modules]
      data[page_id][:children] = tree[:modules]
    end
    data
  end

  def get_module_trees_from_page(page)
    module_match = page.source_file.match(/\/modules\/(.+)/)
    return nil unless module_match
    module_path = module_match[1]
    parts = module_path.split('/')
    module_folder = parts[0]
    tree = restructure_tree(data.tree.modules[module_folder])
    current_tree = {}
    # current_tree = filter_tree_by_path(tree, module_match[0])
    [tree, current_tree]
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
        is_fork = true if child_item[:children] && child_item[:children].count > 0
        # child_item[:order] = 0
        # page = find_page_by_path(child_item[:path])
        # if page && page.data && page.data.order
          # child_item[:order] = page.data.order
        # end
      end
      # child_items.sort_by! do |a|
      #   a[:order]
      # end
      page = find_page_by_path(index_path)
      ret = {
        page: page
      }
      ret[:modules] = page.data.modules.to_a if page.data.modules
      ret[:children] = child_items if child_items.count > 0
      ret[:is_fork] = true if is_fork
      ret
    end
  end

  def filter_tree_by_path(tree, filepath)
    if tree[:path] == filepath
      tree
    else
      found = []
      if tree[:children]
        tree[:children].each do |child|
          if found.count == 0
            tree_by_path = filter_tree_by_path(child, filepath)
            if tree_by_path && tree_by_path[:filtered]
              return tree_by_path
            elsif tree_by_path
              found << tree_by_path
            end
          elsif !tree[:is_fork]
            found << child
          end
        end
      end
      if found.count == 1
        return found.first
      elsif found.count > 0
        return {
          filtered: true,
          children: found
        }
      end
      nil
    end
  end

  def is_fork?(page)
    tree, current_tree = get_module_trees_from_page(page)
    current_tree[:is_fork] if current_tree
  end

  def tree_calculate_time(tree)
    return tree[:minutes] if tree[:minutes]

    # page = find_page_by_path(tree[:url])
    # page = sitemap.find_resource_by_destination_path(tree[:url])
    range = get_time_to_complete(tree[:page])

    unless range
      range = [0, 0]
      if tree[:children]
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
    end

    tree[:minutes] = range if range[0] > 0 || range[1] > 0
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
