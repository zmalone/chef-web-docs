# Gets data out of AWS to store in the repo
require 'aws-sdk'
require 'json'
require 'uri'
require 'pathname'

class AWSDataExporter
  attr_reader :aws_options, :cname, :root_path, :data_path, :user_name

  def initialize
    @root_path = Pathname(__FILE__).dirname + '..'
    @data_path = root_path.join('data', 'aws', 'prod')

    site_options = JSON.load( open data_path + 'site_options.json' )

    @aws_options = { access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                     secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
                     region: site_options['region'],
                   }
    @cname = site_options['cname']
    @user_name = site_options['user_name']
  end

  def export!
    write 'CloudFront', cname do
      cdn.client.list_distributions.data[:items].find do |dist|
        dist[:aliases][:items].include? cname
      end
    end

    write 'IAM', user_name do
      iam.client.list_user_policies(user_name: user_name)
        .data[:policy_names].map do |policy_name|
          JSON.parse(URI.unescape(
            iam.client
              .get_user_policy(user_name: user_name,
                              policy_name: policy_name).data[:policy_document]
          ))
        end
    end

    write "S3/#{cname}", 'policy' do
      s3.buckets[cname].policy.to_h
    end

    write "S3/#{cname}", 'website' do
      s3.buckets[cname].website_configuration.to_hash
    end
  end

  private

  def cdn
    @cdn ||= AWS::CloudFront.new aws_options
  end

  def iam
    @iam ||= AWS::IAM.new aws_options
  end

  def s3
    @s3 ||= AWS::S3.new aws_options
  end

  def write(service, name, &block)
    filename = data_path.join(service, "#{name}.json")

    open(filename, 'w') {|file| file.write(JSON.pretty_generate block.call) }
    puts "Wrote #{filename.relative_path_from root_path}"
  end
end
