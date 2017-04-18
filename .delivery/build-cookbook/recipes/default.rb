################################################################################
#
# Welcome to chef-web-learn
#
# This is the default recipe. It is the only recipe that runs as root. Here we
# install all the components we need to be functional or have to be done as
# root.
#
################################################################################

# Install our chosen version of Ruby
include_recipe 'cia_infra::ruby'
include_recipe 'cia_infra::aws_prereq'

# We include chef-sugar because it gives us easy ways to interact with encrypted
# data bags. It may go away in the future.
include_recipe 'chef-sugar::default'

# We use the chef_handler recipe/cookbook so that we can register the an
# exception handler. The only issue here is that we register it inside the
# recipe so we are only going to get converge time exceptions.
include_recipe 'chef_handler::default'

# We include the delivery-truck default recipe so any setup that delivery-truck
# needs gets done.
include_recipe 'delivery-truck::default'

# We use the route53 resource later on so we need to include it here to get gems
# and other dependencies installed.
include_recipe 'route53::default'

# We use fastly as our CDN. This pulls in the gems to do the interaction later.
include_recipe 'fastly::default'

# We need the toolchain from node to deal with the javascripts... pull in node.
include_recipe 'nodejs::default'

# We need to ensure we have a full toolchain
include_recipe 'build-essential::default'
package 'libxml2-dev'

# We need the linkchecker in functional in order to check the links
execute 'install linkchecker' do
  command 'pip install linkchecker'
  not_if { File::exists?('/usr/local/bin/linkchecker') }
end
