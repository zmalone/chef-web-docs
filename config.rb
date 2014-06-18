require 'lib/sitemap'
require 'lib/compass'
require 'lib/markdown'
require 'lib/helpers/deploy_helpers'
require 'lib/helpers/tab_helpers'
require 'lib/helpers/url_helpers'

# In development you can use `binding.pry` anywhere to pause execution and bring
# up a Ruby REPL
begin
  require 'pry'
rescue LoadError
  logger.debug 'Pry is missing and will not be loaded.'
end

###
# Config
###
set :site_url, 'learnchef.opscode.com'
set :canonical_protocol_and_hostname, "http://#{site_url}"

###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

# Change Compass configuration
compass_config do |config|
  # config.output_style = :compact
  config.line_comments = false
end

# Slim Configuration
Slim::Engine.set_default_options pretty: true, disable_escape: true

###
# Page options, layouts, aliases and proxies
###

activate :directory_indexes
set :trailing_slash, false

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end
page '/robots.txt', layout: false
page '/sitemap.xml', layout: false
page '/website_configuration.xml', layout: false

# S3 hosting needs a page at the root
page '/error.html', directory_index: false

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
helpers do
  include DeployHelpers
  include TabHelpers
  include URLHelpers
end

# Enable Livereload
activate :livereload

# Enable syntax highlighting
activate :syntax

# S3 Redirects
activate :s3_redirect do |config|
  config.bucket  = ENV['AWS_S3_BUCKET']
  config.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
  config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  config.after_build = false
end

# Parse code blocks
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: false

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

# Redirects
redirect '/chef-training', '/additional-resources/#cheftrainingseminars'
redirect '/create-your-first-cookbook', '/tutorials/create-your-first-cookbook/'
redirect '/errors-and-problems', 'http://docs.opscode.com/errors.html'
redirect '/errors-and-problems/401-unauthorized', 'http://docs.opscode.com/errors.html#unauthorized'
redirect '/errors-and-problems/403-forbidden', 'http://docs.opscode.com/errors.html#forbidden'
redirect '/errors-and-problems/workflow-problems', 'http://docs.opscode.com/errors.html#workflow-problems'
redirect '/quickstart', '/set-up-your-chef-environment'
redirect '/quickstart/chef-server', '/set-up-your-chef-environment#step1setupchefserver'
redirect '/quickstart/converge', '/set-up-your-chef-environment##step3setupanodetomanage'
redirect '/quickstart/nodes', '/set-up-your-chef-environment##step3setupanodetomanage'
redirect '/quickstart/workstation', '/set-up-your-chef-environment##step2setupyourworkstation'
redirect '/quickstart/workstation-setup', '/set-up-your-chef-environment##step2setupyourworkstation'
redirect '/screencasts', '/additional-resources#cheffundamentalswebinarseries'
redirect '/set-up-your-chef-environment', '/get-started'
redirect '/starter-use-cases', '/legacy/starter-use-cases/'
redirect '/starter-use-cases/convert-bash-to-chef', '/legacy/starter-use-cases/convert-bash-to-chef/'
redirect '/starter-use-cases/multi-node-ec2', '/legacy/starter-use-cases/multi-node-ec2/'
redirect '/starter-use-cases/multi_node_ec2', '/legacy/starter-use-cases/multi-node-ec2/'
redirect '/starter-use-cases/ntp', '/legacy/starter-use-cases/ntp/'
redirect '/starter-use-cases/windows-match', '/legacy/starter-use-cases/windows-match/'
redirect '/starter-use-cases/wordpress', '/legacy/starter-use-cases/wordpress/'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable asset hash
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end

# Write out a REVISION file that shows which revision we're running
after_build do
  open("#{root_path.join('build', 'REVISION')}", 'w').write(
    ENV['TRAVIS_COMMIT'] || `git rev-parse HEAD`.chomp
  )
end
