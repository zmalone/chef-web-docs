module PageHelper

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
    return unless page
    match = page.url.match(/^\/?(modules|tracks)(\/([^\/]+))?(\/.*)?$/)
    return (match) ? [match[1], match[3]] : ''
  end

  def find_module(page)
    root = page
    section, id = get_page_section(page)
    return unless section === 'modules'
    while root.parent && root.parent.url.start_with?("/modules/#{id}")
      root = root.parent
    end
    get_module_by_id(root.id)
  end

  def find_track(page)
    section, id = get_page_section(page)
    return get_track_by_id(page.id) if section === 'tracks' && id
    module_obj = find_module(page)
    track = tracks.children.select { |track|
      track.modules.select { |id|
        id == module_obj.id
      }.any?
    }.first
    logger.warn "WARN: Unable to find track for '#{module_id}'" if track.blank?
    track
  end

  def get_current_breadcrumbs(page)
    breadcrumbs = []
    module_root = find_module(page)
    track = find_track(page)

    # Initialize a module object at the current page
    module_obj = module_root ? get_module_by_id(page.id) : nil

    # Get the options (children) for the current page
    if module_obj
      if module_obj.is_fork
        breadcrumbs << Hashie::Mash.new({
          title: 'Select One',
          options: module_obj.children.map { |child| child.page }
        })
      end

      # Compile the rest of the breadcrumbs from the current item and parents (in reverse order)
      loop do
        parent = get_module_by_id(module_obj.parent)
        if parent && parent.parent && parent.is_fork
          breadcrumbs.unshift(Hashie::Mash.new({
            title: module_obj.page.data.short_title || module_obj.page.data.title,
            options: parent.children.map { |child| child.page }
          }))
        end
        break unless parent && parent.parent
        module_obj = parent
      end
    end

    # Add module list for the current track
    options = track.modules.map do |module_id|
      get_module_by_id(module_id).page
    end
    breadcrumbs.unshift(Hashie::Mash.new({
      title: module_obj ? module_obj.page.data.short_title || module_obj.page.data.title : 'Select One',
      options: options
    }))

    # Label the breadcrumbs, in forward order
    labels = ['Modules', 'Server Environment', 'Chef Server Environment']
    breadcrumbs.each do |breadcrumb|
      breadcrumb.label = labels.shift
    end

    breadcrumbs
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
      ['id', 'page', 'parent', 'children', 'order'].include?(key)
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

  def format_time(range)
    return unless range
    average = range.reduce(:+) / range.size.to_f
    return if average == 0
    return "#{average.ceil} minutes" unless average > 120
    "#{(average / 60).ceil} hours"
  end

end
