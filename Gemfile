source 'https://rubygems.org'

gem 'middleman',            '~> 3.3.3'
gem 'middleman-syntax',     '~> 2.0.0'
gem 'middleman-cloudfront'
gem 'middleman-s3_redirect'
gem 'middleman-smusher',    '~> 3.0.0'
gem 'middleman-livereload'
gem 'middleman-autoprefixer', '~> 2.7.0'
gem 'builder',              '~> 3.2.0'
gem 'redcarpet',            '~> 2.2.2'
gem 'rb-fsevent',           '~> 0.9'
gem 'slim',                 '~> 1.3.8'
gem 'foundation-rails', require: false
gem 'chef-web-core', git: 'git@github.com:opscode/chef-web-core'
gem 'aws-sdk', '~> 2.0'

group :development, :test do
  gem 'pry'
end

group :test do
  gem 'rspec' # Unit testing
end

group :production do
  gem 'therubyracer',       '~> 0.12.2'
end
