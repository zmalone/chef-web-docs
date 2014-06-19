require 'uri'

# Helpers for URL shortcuts
module URLHelpers
  def canonical_link_tag(path)
    tag :link, :rel => 'canonical', :href => canonical_url(path)
  end

  def canonical_url(path)
    URI.join(canonical_protocol_and_hostname, path).to_s
  end

  def chef_install_url
    'http://www.getchef.com/chef/install/'
  end

  def ec_sign_up_url
    'http://www.getchef.com/contact/on-premises/'
  end

  def hec_sign_up_url
    'https://manage.opscode.com/signup'
  end

  def hec_manage_url
    'https://manage.opscode.com/'
  end
end
