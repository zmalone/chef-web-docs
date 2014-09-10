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
set :site_url, 'learn.getchef.com'
set :canonical_protocol_and_hostname, "https://#{site_url}"

###
# Compass
###

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
page '/robots.txt', layout: false
page '/sitemap.xml', layout: false

# S3 hosting needs a page at the root
page '/error.html', directory_index: false

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  include DeployHelpers
  include TabHelpers
  include URLHelpers
end

# CloudFront
if deploy?
  activate :cloudfront do |cloudfront|
    cloudfront.access_key_id     = aws_access_key_id
    cloudfront.secret_access_key = aws_secret_access_key
    cloudfront.distribution_id   = ENV['CLOUDFRONT_DISTRIBUTION_ID']
  end

  # S3 Redirects
  activate :s3_redirect do |config|
    config.bucket = aws_s3_bucket
    config.aws_access_key_id = aws_access_key_id
    config.aws_secret_access_key = aws_secret_access_key
    config.after_build = true
  end
else
  # We use redirects below. The redirect method is not defined. Define it to do
  # nothing.
  def redirect(from = '', to = '')
  end
end

# Enable Livereload
activate :livereload unless travis?

# Enable syntax highlighting - turn off the default wrapping
activate :syntax, wrap: false
# Override the middleman-syntax to provide backwards compat with pygments wrap
require 'lib/middleman_syntax'

# Parse code blocks
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: false

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

# Redirects
redirect '/additional-resources', '/fundamentals-series/'
redirect '/chef-training', '/additional-resources/#cheftrainingseminars'
redirect '/create-your-first-cookbook', '/tutorials/create-your-first-cookbook/'
redirect '/errors-and-problems', "#{chef_docs_url}/errors.html"
redirect '/errors-and-problems/401-unauthorized', "#{chef_docs_url}/errors.html#unauthorized"
redirect '/errors-and-problems/403-forbidden', "#{chef_docs_url}/errors.html#forbidden"
redirect '/errors-and-problems/workflow-problems', "#{chef_docs_url}/errors.html#workflow-problems"
redirect '/legacy/starter-use-cases/windows-match', '/legacy/starter-use-cases/windows-batch/'
redirect '/quickstart', '/set-up-your-chef-environment'
redirect '/quickstart/chef-server', '/set-up-your-chef-environment#step1setupchefserver'
redirect '/quickstart/converge', '/set-up-your-chef-environment#step3setupanodetomanage'
redirect '/quickstart/nodes', '/set-up-your-chef-environment#step3setupanodetomanage'
redirect '/quickstart/workstation', '/set-up-your-chef-environment#step2setupyourworkstation'
redirect '/quickstart/workstation-setup', '/set-up-your-chef-environment#step2setupyourworkstation'
redirect '/screencasts', '/additional-resources#cheffundamentalswebinarseries'
redirect '/screencasts/spring-fundamentals/chef-lab', '/fundamentals-series/chef-lab'
redirect '/screencasts/spring-fundamentals/week-1', '/fundamentals-series/week-1'
redirect '/screencasts/spring-fundamentals/week-2', '/fundamentals-series/week-2'
redirect '/screencasts/spring-fundamentals/week-2/#homework', '/fundamentals-series/week-2/#homework'
redirect '/screencasts/spring-fundamentals/week-3', '/fundamentals-series/week-3'
redirect '/screencasts/spring-fundamentals/week-4', '/fundamentals-series/week-4'
redirect '/screencasts/spring-fundamentals/week-5', '/fundamentals-series/week-5'
redirect '/screencasts/spring-fundamentals/week-6', '/fundamentals-series/week-6'
redirect '/set-up-your-chef-environment', '/get-started'
redirect '/starter-use-cases', '/legacy/starter-use-cases/'
redirect '/starter-use-cases/convert-bash-to-chef', '/legacy/starter-use-cases/convert-bash-to-chef/'
redirect '/starter-use-cases/multi-node-ec2', '/legacy/starter-use-cases/multi-node-ec2/'
redirect '/starter-use-cases/multi_node_ec2', '/legacy/starter-use-cases/multi-node-ec2/'
redirect '/starter-use-cases/ntp', '/legacy/starter-use-cases/ntp/'
redirect '/starter-use-cases/windows-match', '/legacy/starter-use-cases/windows-batch/'
redirect '/starter-use-cases/wordpress', '/legacy/starter-use-cases/wordpress/'
redirect '/rhel/get-a-virtual-machine', '/rhel/'

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
end

before_build do
  system 'cd lib/chef-lab-client && npm install --production && npm run build' or exit($?.exitstatus)
end

# Write out a REVISION file that shows which revision we're running
after_build do
  open("#{root_path.join('build', 'REVISION')}", 'w').write(
    ENV['TRAVIS_COMMIT'] || `git rev-parse HEAD`.chomp
  )
end

# Enable localization (i18n)
activate :i18n
