require 'csv'
require 'chef/web/core/url_helpers'
require 'slim'
require 'lib/gulp'
require 'lib/sitemap'
require 'lib/markdown'
require 'lib/tree'
require 'lib/helpers/deploy_helpers'
require 'lib/helpers/feature_helpers'
require 'lib/helpers/tab_helpers'
require 'lib/helpers/url_helpers'
require 'lib/helpers/modal_helpers'
require 'lib/helpers/accordion_helpers'
require 'lib/helpers/markdown_helpers'
require 'lib/helpers/box_helpers'
require 'lib/helpers/page_nav_helpers'
require 'lib/helpers/list_helpers'
require 'lib/helpers/inline_code_helpers'
require 'lib/helpers/snippet_helpers'
require 'lib/helpers/button_helpers'
require 'lib/helpers/key_point_helpers'
# require 'lib/extension/chef_yaml_to_json/lib/chef_yaml_to_json'

# In development you can use `binding.pry` anywhere to pause execution and bring
# up a Ruby REPL
begin
  require 'pry'
rescue LoadError
  logger.debug 'Pry is missing and will not be loaded.'
end

# Slim Configuration
Slim::Engine.set_options pretty: true, disable_escape: true

###
# Page options, layouts, aliases and proxies
###
# activate :chef_yml_to_json
activate :directory_indexes
set :trailing_slash, false

# Per-page layout changes:
page '/robots.txt', layout: false
page '/sitemap.xml', layout: false
page '/tracks/**/*', layout: 'track'
page '/modules/**/*', layout: 'module'

# S3 hosting needs a page at the root
page '/error.html', directory_index: false

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  include Chef::Web::Core::URLHelpers
  include DeployHelpers
  include FeatureHelpers
  include TabHelpers
  include URLHelpers
  include ModalHelpers
  include AccordionHelpers
  include MarkdownHelpers
  include BoxHelpers
  include InlineCodeHelpers
  include PageNavHelpers
  include ListHelpers
  include SnippetHelpers
  include ButtonHelpers
  include KeyPointHelpers
end

# Enable Livereload
# activate :livereload, no_swf: true, ignore: /^(?!.*source).*$/ unless travis?

# Enable syntax highlighting - turn off the default wrapping
activate :syntax, wrap: false
# Override the middleman-syntax to provide backwards compat with pygments wrap
require 'lib/middleman_syntax'

# Parse code blocks
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: false, tables: true

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'
set :root_dir, File.dirname(__FILE__)

# Enable generation of navigation tree data based on the site structure
activate :tree

# Build-specific configuration
configure :build do

  # Minify Javascript on build
  activate :minify_javascript

  # Enable asset hash
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

end

before_build do
  if File.exist?(REV_MANIFEST_PATH)
    REV_MANIFEST.merge!(JSON.parse(File.read(REV_MANIFEST_PATH)))
  end

  app.extensions.add_exposed_to_context(self)

  build_tests_dir = File.join(app.root_path, 'build-tests')
  Dir.mkdir(build_tests_dir) unless Dir.exist?(build_tests_dir)

  logger.info 'Validating track metadata...'
  filepath = File.join(build_tests_dir, 'tracks.csv')
  CSV.open(filepath, "wb") do |csv|
    csv << ['module', 'path', 'tags', 'video', 'facebook', 'linkedin', 'twitter']
    tracks.children.each do |mod|
      row_data = []
      mod_data = mod.page.data
      row_data << mod_data.title
      row_data << mod.page.path.gsub('/index.html', '')
      row_data << mod_data.fetch('tags', []).join(',')
      row_data << mod_data.fetch('video_url', '')
      row_data << (mod_data.dig('social_share', 'facebook') ? 'Y' : 'N')
      row_data << (mod_data.dig('social_share', 'linkedin') ? 'Y' : 'N')
      row_data << (mod_data.dig('social_share', 'twitter') ? 'Y' : 'N')
      csv << row_data
    end
  end

  logger.info 'Validating module metadata...'
  filepath = File.join(build_tests_dir, 'modules.csv')
  CSV.open(filepath, "wb") do |csv|
    csv << ['module', 'path', 'tags', 'video', 'facebook', 'linkedin', 'twitter']
    modules.children.each do |mod|
      row_data = []
      mod_data = mod.page.data
      row_data << mod_data.title
      row_data << mod.page.path.gsub('/index.html', '')
      row_data << mod_data.fetch('tags', []).join(',')
      row_data << mod_data.fetch('video_url', '')
      row_data << (mod_data.dig('social_share', 'facebook') ? 'Y' : 'N')
      row_data << (mod_data.dig('social_share', 'linkedin') ? 'Y' : 'N')
      row_data << (mod_data.dig('social_share', 'twitter') ? 'Y' : 'N')
      csv << row_data
    end
  end
end

# Write out a REVISION file that shows which revision we're running
after_build do
  open("#{File.join(File.dirname(__FILE__), 'build', 'REVISION')}", 'w').write(
    ENV['TRAVIS_COMMIT'] || `git rev-parse HEAD`.chomp
  )

  system 'npm run images' or exit($?.exitstatus)
end

# Enable localization (i18n)
activate :i18n
