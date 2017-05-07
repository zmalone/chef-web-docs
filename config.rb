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

# CloudFront
# TODO: Figure out how to reimplmement Cloudfront and S3 Redirects with Middleman v4
# if deploy?
  # activate :cloudfront do |cloudfront|
  #   cloudfront.access_key_id     = aws_access_key_id
  #   cloudfront.secret_access_key = aws_secret_access_key
  #   cloudfront.distribution_id   = ENV['CLOUDFRONT_DISTRIBUTION_ID']
  # end

  # S3 Redirects
  # activate :s3_redirect do |config|
  #   config.bucket = aws_s3_bucket
  #   config.aws_access_key_id = aws_access_key_id
  #   config.aws_secret_access_key = aws_secret_access_key
  #   config.after_build = true
  # end
# else
  # We use redirects below. The redirect method is not defined. Define it to do
  # nothing.
  def redirect(from = '', to = '')
  end
# end

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

# Redirects
chef_docs_url = ''
redirect '/additional-resources', '/fundamentals-series/'
redirect '/chef-training', '/additional-resources/#cheftrainingseminars'
redirect '/create-your-first-cookbook', '/tutorials/create-your-first-cookbook/'
redirect '/errors-and-problems', "#{chef_docs_url}/errors.html"
redirect '/errors-and-problems/401-unauthorized', "#{chef_docs_url}/errors.html#unauthorized"
redirect '/errors-and-problems/403-forbidden', "#{chef_docs_url}/errors.html#forbidden"
redirect '/errors-and-problems/workflow-problems', "#{chef_docs_url}/errors.html#workflow-problems"
redirect '/legacy/starter-use-cases/windows-match', '/legacy/starter-use-cases/windows-batch/'
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

redirect '/rhel', '/learn-the-basics/rhel/'
redirect '/rhel/configure-a-resource', '/learn-the-basics/rhel/configure-a-resource/'
redirect '/rhel/configure-a-package-and-service', '/learn-the-basics/rhel/configure-a-package-and-service/'
redirect '/rhel/make-your-recipe-more-manageable', '/learn-the-basics/rhel/make-your-recipe-more-manageable/'
redirect '/rhel/get-ready-to-add-another-server', '/manage-a-node/rhel/get-set-up/'
redirect '/rhel/bootstrap-your-node', '/manage-a-node/rhel/bootstrap-your-node/'
redirect '/rhel/add-dynamic-configuration', '/manage-a-node/rhel/update-your-nodes-configuration/'

redirect '/windows', '/learn-the-basics/windows/'
redirect '/windows/configure-a-resource', '/learn-the-basics/windows/configure-a-resource/'
redirect '/windows/configure-a-package-and-service', '/learn-the-basics/windows/configure-a-package-and-service/'
redirect '/windows/make-your-recipe-more-manageable', '/learn-the-basics/windows/make-your-recipe-more-manageable/'
redirect '/windows/get-ready-to-add-another-server', '/manage-a-node/windows/get-set-up/'
redirect '/windows/bootstrap-your-node', '/manage-a-node/windows/bootstrap-your-node/'
redirect '/windows/add-dynamic-configuration', '/manage-a-node/windows/update-your-nodes-configuration/'

redirect '/ubuntu', '/learn-the-basics/ubuntu/'
redirect '/ubuntu/configure-a-resource', '/learn-the-basics/ubuntu/configure-a-resource/'
redirect '/ubuntu/configure-a-package-and-service', '/learn-the-basics/ubuntu/configure-a-package-and-service/'
redirect '/ubuntu/make-your-recipe-more-manageable', '/learn-the-basics/ubuntu/make-your-recipe-more-manageable/'
redirect '/ubuntu/get-ready-to-add-another-server', '/manage-a-node/ubuntu/get-set-up/'
redirect '/ubuntu/bootstrap-your-node', '/manage-a-node/ubuntu/bootstrap-your-node/'
redirect '/ubuntu/add-dynamic-configuration', '/manage-a-node/ubuntu/update-your-nodes-configuration/'

redirect '/legacy', '/'
redirect '/legacy/concepts/cookbooks', '/'
redirect '/legacy/concepts/environments', '/'
redirect '/legacy/concepts', '/'
redirect '/legacy/concepts/nodes', '/'
redirect '/legacy/concepts/organizations', '/'
redirect '/legacy/concepts/recipes', '/'
redirect '/legacy/concepts/resources', '/'
redirect '/legacy/concepts/roles', '/'
redirect '/legacy/concepts/run-lists', '/'
redirect '/legacy/get-started', '/'
redirect '/legacy/starter-use-cases/convert-bash-to-chef', '/'
redirect '/legacy/starter-use-cases', '/'
redirect '/legacy/starter-use-cases/multi-node-ec2', '/'
redirect '/legacy/starter-use-cases/ntp', '/'
redirect '/legacy/starter-use-cases/windows-batch', '/'
redirect '/legacy/starter-use-cases/wordpress', '/'
redirect '/legacy/tutorials/create-your-first-cookbook', '/'
redirect '/legacy/tutorials', '/'
redirect '/legacy/tutorials/write-for-multiple-platforms', '/'

redirect '/tutorials/create-your-first-cookbook/', '/'
redirect '/tutorials/write-for-multiple-platforms', '/'

redirect '/fundamentals-series/chef-lab', '/skills/fundamentals-series-chef-lab/'
redirect '/fundamentals-series/week-1', '/skills/fundamentals-series-week-1/'
redirect '/fundamentals-series/week-2', '/skills/fundamentals-series-week-2/'
redirect '/fundamentals-series/week-3', '/skills/fundamentals-series-week-3/'
redirect '/fundamentals-series/week-4', '/skills/fundamentals-series-week-4/'
redirect '/fundamentals-series/week-5', '/skills/fundamentals-series-week-5/'
redirect '/fundamentals-series/week-6', '/skills/fundamentals-series-week-6/'
redirect '/fundamentals-series/', '/skills/fundamentals-series-week-1/'
redirect '/fundamentals-series/rhel', '/skills/fundamentals-series-week-1/'

redirect '/test-your-infrastructure-code', '/tutorials/test-your-infrastructure-code/'
redirect '/compliance-assess', '/tutorials/compliance-assess/'
redirect '/compliance-remediate', '/tutorials/compliance-remediate/'

# Build-specific configuration
configure :build do

  # Minify Javascript on build
  activate :minify_javascript

  # Enable asset hash
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # TODO: Figure out how to re-enable smusher with Middleman v4
  # activate :smusher
end

before_build do
  if File.exist?(REV_MANIFEST_PATH)
    REV_MANIFEST.merge!(JSON.parse(File.read(REV_MANIFEST_PATH)))
  end
end

# Write out a REVISION file that shows which revision we're running
after_build do
  open("#{File.join(File.dirname(__FILE__), 'build', 'REVISION')}", 'w').write(
    ENV['TRAVIS_COMMIT'] || `git rev-parse HEAD`.chomp
  )
end

# Enable localization (i18n)
activate :i18n
