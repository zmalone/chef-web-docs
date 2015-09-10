require 'fileutils'
require 'bundler/setup'

desc 'Safe build the site and only update the symlink if the build succeeded'
task :build do
  system "bundle exec middleman build --clean"

  if $?.success?
    FileUtils.mv 'build', 'current'
  else
    fail "The build was not successful. Please see the output for more information."
  end
end

desc "build redirects"
task :build_redirects do
  require 'aws-sdk'
  s3 = Aws::S3::Client.new(region: 'us-east-1')
  resource = Aws::S3::Resource.new(client: s3)
  bucket = resource.bucket(ENV.fetch('S3_BUCKET'))
  redirects = JSON.parse(File.read('config/redirects.json'))

  redirects.each_key do |r|
    obj = bucket.object(r)

    obj.put(website_redirect_location: redirects[r], acl: 'public-read')
    puts "#{r} -> #{redirects[r]}"
  end
end
