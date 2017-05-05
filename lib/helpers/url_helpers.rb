require 'uri'

# Helpers for URL shortcuts
module URLHelpers
  def canonical_link_tag(path)
    tag :link, rel: 'canonical', href: canonical_url_with_trailing_slash(path)
  end

  def canonical_url(path)
    URI.join(learn_chef_url, path).to_s
  end

  def canonical_url_with_trailing_slash(path)
    File.join(canonical_url(path), '/')
  end

  def chef_lab_url
    'http://opscode-cheflab.herokuapp.com'
  end

  def chef_training_url
    chef_www_url('training/')
  end

  def ec_sign_up_url
    chef_www_url('contact/on-premises/')
  end

  def chef_dk_url
    "#{chef_downloads_url}/chef-dk/"
  end

  def learn_chef_twitter_url
    'https://twitter.com/learnchef'
  end
end
