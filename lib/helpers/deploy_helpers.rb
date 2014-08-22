# Helpers for deployment
module DeployHelpers
  def aws_access_key_id
    case ENV['TRAVIS_BRANCH']
    when 'master', 'sandbox'
      ENV['PREPROD_AWS_ACCESS_KEY_ID']
    when 'release'
      ENV['PROD_AWS_ACCESS_KEY_ID']
    else
      ENV['AWS_ACCESS_KEY_ID']
    end
  end

  def aws_secret_access_key
    case ENV['TRAVIS_BRANCH']
    when 'master', 'sandbox'
      ENV['PREPROD_AWS_SECRET_ACCESS_KEY']
    when 'release'
      ENV['PROD_AWS_SECRET_ACCESS_KEY']
    else
      ENV['AWS_SECRET_ACCESS_KEY']
    end
  end

  def aws_s3_bucket
    case ENV['TRAVIS_BRANCH']
    when 'master'
      ENV['PREPROD_AWS_S3_BUCKET']
    when 'release'
      ENV['PROD_AWS_S3_BUCKET']
    when 'sandbox'
      ENV['SANDBOX_AWS_S3_BUCKET']
    else
      ENV['AWS_S3_BUCKET']
    end
  end

  # Is this a branch we're deploying?
  def deploy?
    !ENV['TRAVIS_PULL_REQUEST'] &&
      %w[ master release sandbox ].include?(ENV['TRAVIS_BRANCH'])
  end

  def preprod?
    ENV['TRAVIS_BRANCH'].present? && ENV['TRAVIS_BRANCH'] != 'release'
  end

  def travis?
    !ENV['TRAVIS'].nil?
  end
end
