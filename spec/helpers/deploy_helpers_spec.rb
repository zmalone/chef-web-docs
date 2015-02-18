require_relative '../../lib/helpers/deploy_helpers'

describe DeployHelpers do
  subject(:helper) { Object.new.extend(DeployHelpers) }

  before :each do
    stub_const 'ENV', 'AWS_ACCESS_KEY_ID'             => 'access key id',
                      'PREPROD_AWS_ACCESS_KEY_ID'     => 'preprod access key id',
                      'PROD_AWS_ACCESS_KEY_ID'        => 'prod access key id',
                      'AWS_SECRET_ACCESS_KEY'         => 'secret access key',
                      'PREPROD_AWS_SECRET_ACCESS_KEY' => 'preprod secret access key',
                      'PROD_AWS_SECRET_ACCESS_KEY'    => 'prod secret access key',
                      'AWS_S3_BUCKET'                 => 's3 bucket',
                      'PREPROD_AWS_S3_BUCKET'         => 'preprod s3 bucket',
                      'PROD_AWS_S3_BUCKET'            => 'prod s3 bucket',
                      'SANDBOX_AWS_S3_BUCKET'         => 'sandbox s3 bucket',
                      'BETA_AWS_S3_BUCKET'            => 'beta s3 bucket'
  end

  describe 'aws_access_key_id' do
    subject(:aws_access_key_id) { helper.aws_access_key_id }

    context 'when TRAVIS_BRANCH is master' do
      it 'is ENV["PREPROD_AWS_ACCESS_KEY_ID"]' do
        ENV['TRAVIS_BRANCH'] = 'master'
        expect(aws_access_key_id).to eq 'preprod access key id'
      end
    end

    context 'when TRAVIS_BRANCH is sandbox' do
      it 'is ENV["PREPROD_AWS_ACCESS_KEY_ID"]' do
        ENV['TRAVIS_BRANCH'] = 'sandbox'
        expect(aws_access_key_id).to eq 'preprod access key id'
      end
    end

    context 'when TRAVIS_BRANCH is release' do
      it 'is ENV["PROD_AWS_ACCESS_KEY_ID"]' do
        ENV['TRAVIS_BRANCH'] = 'release'
        expect(aws_access_key_id).to eq 'prod access key id'
      end
    end

    context 'when TRAVIS_BRANCH is beta' do
      it 'is ENV["PROD_AWS_ACCESS_KEY_ID"]' do
        ENV['TRAVIS_BRANCH'] = 'beta'
        expect(aws_access_key_id).to eq 'prod access key id'
      end
    end

    context 'when TRAVIS_BRANCH is something else' do
      it 'is ENV["AWS_ACCESS_KEY_ID"]' do
        ENV['TRAVIS_BRANCH'] = 'test'
        expect(aws_access_key_id).to eq 'access key id'
      end
    end
  end

  describe 'aws_secret_access_key' do
    subject(:aws_secret_access_key) { helper.aws_secret_access_key }

    context 'when TRAVIS_BRANCH is master' do
      it 'is ENV["PREPROD_AWS_SECRET_ACCESS_KEY"]' do
        ENV['TRAVIS_BRANCH'] = 'master'
        expect(aws_secret_access_key).to eq 'preprod secret access key'
      end
    end

    context 'when TRAVIS_BRANCH is sandbox' do
      it 'is ENV["PREPROD_AWS_SECRET_ACCESS_KEY"]' do
        ENV['TRAVIS_BRANCH'] = 'sandbox'
        expect(aws_secret_access_key).to eq 'preprod secret access key'
      end
    end

    context 'when TRAVIS_BRANCH is release' do
      it 'is ENV["PROD_AWS_SECRET_ACCESS_KEY"]' do
        ENV['TRAVIS_BRANCH'] = 'release'
        expect(aws_secret_access_key).to eq 'prod secret access key'
      end
    end

    context 'when TRAVIS_BRANCH is beta' do
      it 'is ENV["PROD_AWS_SECRET_ACCESS_KEY"]' do
        ENV['TRAVIS_BRANCH'] = 'beta'
        expect(aws_secret_access_key).to eq 'prod secret access key'
      end
    end

    context 'when TRAVIS_BRANCH is something else' do
      it 'is ENV["AWS_SECRET_ACCESS_KEY"]' do
        ENV['TRAVIS_BRANCH'] = 'test'
        expect(aws_secret_access_key).to eq 'secret access key'
      end
    end
  end

  describe 'aws_s3_bucket' do
    subject(:aws_s3_bucket) { helper.aws_s3_bucket }

    context 'when TRAVIS_BRANCH is master' do
      it 'is ENV["PREPROD_AWS_S3_BUCKET"]' do
        ENV['TRAVIS_BRANCH'] = 'master'
        expect(aws_s3_bucket).to eq 'preprod s3 bucket'
      end
    end

    context 'when TRAVIS_BRANCH is sandbox' do
      it 'is ENV["SANDBOX_AWS_S3_BUCKET"]' do
        ENV['TRAVIS_BRANCH'] = 'sandbox'
        expect(aws_s3_bucket).to eq 'sandbox s3 bucket'
      end
    end

    context 'when TRAVIS_BRANCH is release' do
      it 'is ENV["PROD_AWS_S3_BUCKET"]' do
        ENV['TRAVIS_BRANCH'] = 'release'
        expect(aws_s3_bucket).to eq 'prod s3 bucket'
      end
    end

    context 'when TRAVIS_BRANCH is beta' do
      it 'is ENV["PROD_AWS_S3_BUCKET"]' do
        ENV['TRAVIS_BRANCH'] = 'beta'
        expect(aws_s3_bucket).to eq 'beta s3 bucket'
      end
    end

    context 'when TRAVIS_BRANCH is something else' do
      it 'is ENV["AWS_S3_BUCKET"]' do
        expect(aws_s3_bucket).to eq 's3 bucket'
      end
    end
  end

  describe 'deploy?' do
    subject(:deploy?) { helper.deploy? }

    context 'when TRAVIS_BRANCH is master' do
      before :each do
        ENV['TRAVIS_BRANCH'] = 'master'
      end

      context 'when TRAVIS_PULL_REQUEST is not set' do
        it 'is true' do
          ENV['TRAVIS_PULL_REQUEST'] = nil
          expect(deploy?).to eq true
        end
      end

      context 'when TRAVIS_PULL_REQUEST is "false"' do
        it 'is true' do
          ENV['TRAVIS_PULL_REQUEST'] = 'false'
          expect(deploy?).to eq true
        end
      end

      context 'when TRAVIS_PULL_REQUEST is set' do
        it 'is false' do
          ENV['TRAVIS_PULL_REQUEST'] = '123'
          expect(deploy?).to eq false
        end
      end

      it 'is true' do
        expect(deploy?).to eq true
      end
    end

    context 'when TRAVIS_BRANCH is release' do
      it 'is true' do
        ENV['TRAVIS_BRANCH'] = 'release'
        expect(deploy?).to eq true
      end
    end

    context 'when TRAVIS_BRANCH is sandbox' do
      it 'is true' do
        ENV['TRAVIS_BRANCH'] = 'sandbox'
        expect(deploy?).to eq true
      end
    end

    context 'when TRAVIS_BRANCH is beta' do
      it 'is true' do
        ENV['TRAVIS_BRANCH'] = 'beta'
        expect(deploy?).to eq true
      end
    end

    context 'when TRAVIS_BRANCH is something else' do
      it 'is false' do
        expect(deploy?).to eq false
      end
    end
  end

  describe 'travis?' do
    context 'when the TRAVIS environment variable is set' do
      it 'is true' do
        ENV['TRAVIS'] = 'true'
        expect(helper.travis?).to eq true
      end
    end

    context 'when the TRAVIS environment variable is not set' do
      it 'is false' do
        expect(helper.travis?).to eq false
      end
    end
  end
end
