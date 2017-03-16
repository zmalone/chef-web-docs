source 'https://rubygems.org'

gem 'middleman',            '~> 4.2.1'
gem 'middleman-syntax',     '~> 3.0.0'
gem 'middleman-navtree',    '~> 0.1.11'
gem 'middleman-minify-html','~> 3.4.1'
gem 'builder',              '~> 3.2.3'
gem 'redcarpet',            '~> 3.4.0'
gem 'rb-fsevent',           '~> 0.9.8'
# TODO: Install Slim > 3.0.7 when it is available (adds Angular syntax support, see Slim README)
gem 'slim', :git => 'https://github.com/slim-template/slim.git', :branch => 'master'
gem 'chef-web-core', git: 'git@github.com:opscode/chef-web-core'
gem 'aws-sdk', '~> 2.7.4'

group :development, :test do
  gem 'pry'
end

group :test do
  gem 'rspec' # Unit testing
  gem 'guard-rspec', require: false
end

group :production do
  gem 'therubyracer',       '~> 0.12.2'
end
