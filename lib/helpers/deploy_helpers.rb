# Helpers for deployment
module DeployHelpers
  def preprod?
    ENV['TRAVIS_BRANCH'] != 'release'
  end
end
