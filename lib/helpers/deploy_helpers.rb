# Helpers for deployment
module DeployHelpers
  def preprod?
    ENV['TRAVIS_BRANCH'] == 'master'
  end
end
