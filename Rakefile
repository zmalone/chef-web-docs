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
