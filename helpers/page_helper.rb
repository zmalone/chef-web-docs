module PageHelper
  # Takes a raw filesystem path and returns a path as used by Middleman's internal sitemap, without
  # additional extensions, and skipping partials.
  # E.g. index.html -> index.html, index.html.md -> index.html, index.html.md.erb -> index.html
  # E.g. _index.erb -> nil
  # TODO: Remove. Use new tree extension exposed methods.
  def get_sitemap_path(path)
    return unless path.is_a? String
    return if path.match(/\/_[^\/]+$/)
    path.sub(/(\.[\w]+)[\.\w]*$/, '\\1')
  end

  # Call sitemap.find_resource_by_path after formatting the path to match Middleman sitemap standard
  # TODO: Remove. Use new tree extension exposed methods.
  def find_page_by_path(filepath)
    path = get_sitemap_path(filepath)
    page = sitemap.find_resource_by_path(path) unless path.blank?
    logger.warn "WARN: Unable to find page #{filepath}" if !path.nil? && page.blank?
    page
  end

  # TODO: Remove. Use new tree extension exposed methods.
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

  # TODO: Remove. Use new tree extension exposed methods.
  def extract_filepaths_from_tree(hash, max_depth = -1, current_depth = 0)
    filepaths = []
    if max_depth == -1 || max_depth > current_depth
      current_depth = current_depth + 1
      if hash.respond_to? :to_hash
        values = hash.to_hash.values
        values.each do |val|
          if val.respond_to? :to_hash
            filepaths.concat(extract_filepaths_from_tree(val, max_depth, current_depth + 1))
          else
            filepaths << val
          end
        end
      end
    end
    filepaths
  end

  # Find a page by the ID attribute in the frontmatter data
  # TODO: Remove. Use new tree extension exposed methods.
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
    match = page.url.match(/^\/?(modules|tracks)(\/([^\/]+))?(\/.*)?$/)
    return (match) ? [match[1], match[3]] : ''
  end

  def find_module(page)
    root = page
    section, id = get_page_section(page)
    if section === 'modules'
      while root.parent && root.parent.url.start_with?("/modules/#{id}")
        root = root.parent
      end
      get_module_by_id(root.id)
    end
  end

  def find_track(page)
    module_obj = find_module(page)
    track = tracks.children.select { |track|
      track.modules.select { |id|
        id == module_obj.id
      }.any?
    }.first
    logger.warn "WARN: Unable to find track for '#{module_id}'" if track.blank?
    track
  end

  def is_fork?(page)
    is_module = get_module_by_id(page.id)
    is_module.is_fork if is_module
  end

  def get_tree_data
    {
      tracks: flatten_tree(tracks),
      modules: flatten_tree(modules)
    }
  end

  def flatten_tree(tree)
    data = {}
    data[tree.id] = {}
    data[tree.id][:url] = tree.page.url

    # Copy over most of the keys, except the certain keys, i.e. the page object, or the children
    tree.keys.reject { |key|
      ['id', 'page', 'children', 'order'].include?(key)
    }.each { |key|
      val = tree[key]
      # Use default Ruby arrays and hashes
      val = val.to_hash if val.is_a? Hash
      val = val.to_a if val.is_a? Array
      data[tree.id][key.to_sym] = val
    }

    if tree.children
      tree.children.each do |child|
        data[tree.id][:children] ||= []
        data[tree.id][:children] << child.id
        data.merge!(flatten_tree(child))
      end
    end

    # Remove empty values
    tree.delete(:minutes) unless tree[:minutes] && (tree[:minutes][0] > 0 || tree[:minutes][1] > 0)
    tree.delete(:remaining) unless tree[:remaining] && (tree[:remaining][0] > 0 || tree[:remaining][1] > 0)

    data
  end

  # TODO: Remove. Use new tree extension exposed methods.
  def get_module_trees_from_page(page)
    module_match = page.source_file.match(/\/modules\/(.+)/)
    return nil unless module_match
    module_path = module_match[1]
    parts = module_path.split('/')
    module_folder = parts[0]
    tree = restructure_tree(data.tree.modules[module_folder])
    current_tree = {}
    [tree, current_tree]
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
