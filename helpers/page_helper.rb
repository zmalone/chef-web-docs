module PageHelper

  def home_page
    sitemap.find_resource_by_path("index.html")
  end

  def find_next_page(page)
    module_obj = get_module_by_id(page.id)
    return unless module_obj
    if module_obj.children && module_obj.children.first
      module_obj.children.first
    elsif module_obj.parent
      return if module_obj.parent === 'modules'
      parent = get_module_by_id(module_obj.parent)
      index = parent.children.index(module_obj)
      parent.children[index + 1]
    end
  end

  def get_page_section(page)
    return unless page
    match = page.url.match(/^\/?(modules|tracks)(\/([^\/]+))?(\/.*)?$/)
    return (match) ? [match[1], match[3]] : ''
  end

  def get_module(page)
    root = page
    section, id = get_page_section(page)
    return unless section === 'modules'
    while root.parent && root.parent.url.start_with?("/modules/#{id}")
      root = root.parent
    end
    get_module_by_id(root.id)
  end

  # Sorts modules by the order they should appear on the Modules tab.
  def sort_modules(modules)
    # Visit each track, in order, adding the module ID to an array. There is no need to reduce
    # duplicates as the order in which modules first appear in a track is all that matters.
    module_order = tracks.children.map { |track| track.modules }.flatten

    # Sort the modules by the order of first appearance in a track, followed by page title
    # in alphabetical order for any remaining modules not associated with a track.
    modules
      .map { |mod| [ module_order.index(mod.id) || module_order.count, mod.page.data.title, mod ] }
      .sort
      .map(&:last)
  end

  def get_track(page)
    section, id = get_page_section(page)
    return get_track_by_id(page.id) if section === 'tracks' && id
    module_obj = get_module(page)
    return unless module_obj
    track = tracks.children.select { |track|
      track.modules.select { |id|
        id == module_obj.id
      }.any?
    }.first
    logger.warn "WARN: Unable to find track for '#{module_obj.id}'" if track.blank?
    track
  end

  def get_parent_multipage(page)
    current_fork = page
    while current_fork.parent && !is_fork?(current_fork.parent)
      current_fork = current_fork.parent
    end
    get_module_by_id(current_fork.id)
  end

  def get_current_breadcrumbs(page)
    breadcrumbs = []
    module_root = get_module(page)
    track = get_track(page)
    return [] unless track  # no breadcrumb when no tracks for a module

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
            page: module_obj.page,
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
      page: track.page,
      title: module_obj ? module_obj.page.data.short_title || module_obj.page.data.title : 'Select One',
      options: options
    }))

    # Label the breadcrumbs, in forward order
    default_labels = ['Modules', 'Server Platform', 'Chef Server Environment']
    breadcrumbs.each_with_index do |breadcrumb, index|
      if breadcrumbs[index - 1] && breadcrumbs[index - 1].page && breadcrumbs[index - 1].page.data
        breadcrumb.label = breadcrumbs[index - 1].page.data.breadcrumb_label
      end
      breadcrumb.label = default_labels.shift unless breadcrumb.label
    end

    breadcrumbs
  end

  def is_fork?(page)
    is_module = get_module_by_id(page.id)
    is_module.is_fork if is_module
  end

  def get_page_classes(page, existing_classes)
    classes = [existing_classes]
    section, id = get_page_section(page)
    if section === 'modules' && get_module_by_id(page.id)
      fork_class = is_fork?(page) ? 'multi-page' : 'unit-page'
      classes << fork_class
    end
    classes.join(' ')
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
    data[tree.id][:url] = tree.page.url if tree.page

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

  def format_time(range)
    return unless range
    average = range.reduce(:+) / range.size.to_f
    return if average == 0
    return "#{average.ceil} minutes" unless average > 120
    "#{(average / 60).ceil} hours"
  end

  def get_tag_classes(tags_list)
    return tags_list.join(' ') if tags_list
  end

  def get_quiz_data(page)
    # Look for quiz data in external file first.
    if page.data.quiz_path
      require 'yaml'
      data = YAML.load_file(page.data.quiz_path)
    # Otherwise, return inline quiz data.
    else
      data = page.data.quiz
    end
    return unless data
    data.each do |question|
      question['question'] = render_markdown_string(question['question']).gsub!(/<\/?p>/, '')
      question['choices'].each_with_index do |choice, index|
        question['choices'][index] = render_markdown_string(choice).gsub!(/<\/?p>/, '')
      end
    end
    data
  end

  def get_coasters
    tracks.children.map { |track|
      { id: track.id, image_url: track.page.data.image_url }
    }.concat([
      { id: 'grand-opening', image_url: '/assets/images/coasters/grand-opening.png' }
    ])
  end

  def get_module_progress_status(page)
    return true if page.url.match('profile')
  end

  def social_twitter_share(page)
    return '#' if ENV['DISABLE_SOCIAL']
    social_data = data['social_share']['twitter']
    sharer_url = social_data['sharer_url']
    content = page.data.social_share.try(&:twitter).try(&:post) ||
              page.data.social_share.try(&:post) ||
              truncate(page.data.description, length: 140)
    "#{sharer_url}?text=#{content}&url=#{encoded_canonical_url(page.url)}"
  end

  def social_facebook_share(page)
    return '#' if ENV['DISABLE_SOCIAL']
    social_data = data['social_share']['facebook']
    sharer_url = social_data['sharer_url']
    "#{sharer_url}?u=#{encoded_canonical_url(page.url)}"
  end

  def social_google_plus_share(page)
    return '#' if ENV['DISABLE_SOCIAL']
    social_data = data['social_share']['google_plus']
    sharer_url = social_data['sharer_url']
    "#{sharer_url}?url=#{encoded_canonical_url(page.url)}"
  end

  def social_linkedin_share(page)
    return '#' if ENV['DISABLE_SOCIAL']
    social_data = data['social_share']['linkedin']
    sharer_url = social_data['sharer_url']
    title = page.data.social_share.try(&:linkedin).try(&:title) || page.data.title
    summary = page.data.social_share.try(&:linkedin).try(&:post) || page.data.description
    "#{sharer_url}?mini=true&title=#{title}&summary=#{summary}&url=#{encoded_canonical_url(page.url)}"
  end

  def encoded_canonical_url(url)
    URI.encode(canonical_url(url))
  end

  def tweet_text(page)
    page.data.try(&:social_share).try(&:twitter).try(&:post) ||
      page.data.try(&:social_share).try(&:post) ||
      truncate(page.data.description, length: 140)
  end

  def social_share_linkedin_title(page)
    page.data.try(&:social_share).try(&:linkedin).try(&:title) || page.data.title
  end

  def social_share_linkedin_summary(page)
    page.data.try(&:social_share).try(&:linkedin).try(&:post) || page.data.description
  end

  def meta_og(page, type)
    page.data.try(&:social_share).try(&:facebook).try(type) ||
    page.data.try(&:social_share).try(&:shared).try("#{type}")
  end
end
