require 'uri'

# Helpers for URL shortcuts
module URLHelpers
  def canonical_link_tag(path)
    tag :link, :rel => 'canonical', :href => canonical_url(path)
  end

  def canonical_url(path)
    URI.join(canonical_protocol_and_hostname, path).to_s
  end

  def chef_url
    'http://www.getchef.com'
  end

  def chef_downloads_url
    'https://downloads.getchef.com'
  end

  def chef_docs_url
    'https://docs.getchef.com'
  end

  def chef_install_url
    "#{chef_url}/chef/install/"
  end

  def chef_lab_url
    'http://opscode-cheflab.herokuapp.com'
  end

  def chef_training_url
    "#{chef_url}/training/"
  end

  def ec_sign_up_url
    "#{chef_url}/contact/on-premises/"
  end

  def hec_sign_up_url
    "#{hec_manage_url}/signup"
  end

  def hec_manage_url
    'https://manage.opscode.com'
  end

  def learn_chef_twitter_url
    'https://twitter.com/learnchef'
  end

  def supermarket_url
    'https://supermarket.getchef.com'
  end
end
