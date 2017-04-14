# Based on Middleman-NavTree, with Chef-specific track and module tree structure processing.

# Require core library
require 'middleman-core'

# Extension namespace
class Tree < ::Middleman::Extension
  expose_to_template :modules
  expose_to_template :tracks
  expose_to_template :get_module_by_id
  expose_to_template :get_track_by_id

  # All the options for this extension
  option :ignore_files, ['sitemap.xml', 'robots.txt'], 'A list of filenames we want to ignore when building our tree.'
  option :ignore_dir, ['assets'], 'A list of directory names we want to ignore when building our tree.'
  option :ext_whitelist, [], 'A whitelist of filename extensions (post-render) that we are allowing in our navtree. Example: [".html"]'

  # Helpers for use within templates and layouts.
  # self.defined_helpers = [ ::Middleman::NavTree::Helpers ]

  def initialize(app, options_hash={}, &block)
    # Call super to build options from the options_hash
    super

    require 'yaml'
  end

  def after_configuration
    # Add the user's config directories to the "ignore_dir" option because
    # these are all things we won't need printed in a NavTree.
    options.ignore_dir << app.config[:js_dir]
    options.ignore_dir << app.config[:css_dir]
    options.ignore_dir << app.config[:fonts_dir]
    options.ignore_dir << app.config[:images_dir]
    options.ignore_dir << app.config[:helpers_dir]
    options.ignore_dir << app.config[:layouts_dir]
    options.ignore_dir << app.config[:partials_dir]

    # Write our directory tree to files as YAML.
    FileUtils.mkdir_p(app.config[:data_dir])

    # Build a hash of our directory information
    @tree_hash = scan_directory(app.source_dir, options)
    write_yml('tree.yml', @tree_hash)
  end

  def modules
    @modules
  end

  def tracks
    @tracks
  end

  def get_module_by_id(id)
    return if id.nil?
    module_obj = get_by_id(modules, id)
    logger.warn "WARN: Unable to find module '#{id}'" unless module_obj
    module_obj
  end

  def get_track_by_id(id)
    return if id.nil?
    track = get_by_id(tracks, id)
    logger.warn "WARN: Unable to find track '#{id}'" unless track
    track
  end

  def get_by_id(tree, id)
    return tree if tree.id == id
    tree.children.each do |child|
      found = get_by_id(child, id)
      return found if found
    end
    nil
  end

  def manipulate_resource_list(resources)
    if @modules.nil? || @tracks.nil?
      @modules = process_tree(@tree_hash['modules'])
      @tracks = process_tree(@tree_hash['tracks'])
    end
    resources
  end

  def process_tree(file_tree, parent = nil)
    file_tree ||= {}
    data = Hashie::Mash.new
    file_and_folders = file_tree.keys
    folders = file_and_folders.reject { |key| key =~ /\./ }
    file = file_and_folders.select { |key| key =~ /^index\./ }.first

    if file
      # Make sure the extension path ends with .html
      filename = app.sitemap.extensionless_path(file_tree[file])
      unless filename.end_with? ".html"
        filename << ".html"
      end
      page = app.sitemap.find_resource_by_path(filename)
      page_id = page.id
      data.id = page_id
      data.page = page
      data.order = page.data.order || 0
      data.minutes = page.minutes || [0, 0]
      data.remaining = data.minutes.clone
      data.modules = page.data.modules.to_a if page.data.modules
      data.parent = parent.id unless parent.nil?
      data.children = []

      folders.each do |folder|
        child = process_tree(file_tree[folder], data)
        unless child.empty?
          data.children << child
          data.is_fork = true if child.children.count > 0
        end
      end

      data.children.sort_by! do |a|
        a.order
      end

      # Add up remaining time for child pages
      if data.is_fork
        range = [0, 0]
        data.children.each do |child|
          range[0] = (range[0] > 0) ? [range[0], child.remaining[0]].min : child.remaining[0]
          range[1] = [range[1], child.remaining[1]].max
        end
        data.remaining[0] += range[0]
        data.remaining[1] += range[1]
      else
        data.children.each do |child|
          data.remaining[0] += child.remaining[0]
          data.remaining[1] += child.remaining[1]
        end
      end

      # Verify the existence of modules on a track, and add up the time
      if data.modules
        data.modules.delete_if do |module_id|
          child = self.get_module_by_id(module_id)
          next true unless child
          if child.remaining
            data.remaining[0] += child.remaining[0]
            data.remaining[1] += child.remaining[1]
          end
          false
        end
      end
    end

    data
  end

  def write_yml(filename, data)
    filepath = app.config[:data_dir] + '/' + filename
    IO.write(filepath, YAML::dump(data))
  end

  # Method for storing the directory structure in an ordered hash. See more on
  # ordered hashes at https://www.igvita.com/2009/02/04/ruby-19-internals-ordered-hash/
  def scan_directory(path, options, name=nil)
    data = {}
    Dir.foreach(path) do |filename|

      # Check to see if we should skip this file. We skip invisible files
      # (starts with "."), ignored files, and promoted files (which are
      # handled later in the process).
      next if (filename[0] == '.')
      next if (filename == '..' || filename == '.')
      next if options.ignore_files.include? filename

      full_path = File.join(path, filename)
      if File.directory?(full_path)
        # This item is a directory.
        # Check to see if we should ignore this directory.
        next if options.ignore_dir.include? filename

        # Loop through the method again.
        data.store(filename.gsub(' ', '%20'), scan_directory(full_path, options, filename))
      else

        # This item is a file.
        if !options.ext_whitelist.empty?
          # Skip any whitelisted extensions.
          next unless options.ext_whitelist.include? File.extname(filename)
        end

        original_path = path.to_s.sub(/^#{app.source_dir}/, '') + '/' + filename
        data.store(filename.gsub(' ', '%20'), original_path.gsub(' ', '%20'))
      end
    end

    # Return this level's data as a hash sorted by keys.
    return Hash[data.sort]
  end
end

# Register extension
::Middleman::Extensions.register(:tree, Tree)
