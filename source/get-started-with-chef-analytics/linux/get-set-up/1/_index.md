## 1. Install the Chef Development Kit on your workstation

You administer your network with your workstation. Your workstation is also where you write your Chef code. Remember that although you'll be configuring an Ubuntu machine, your workstation can be any OS you choose &ndash; be it Linux, Mac OS, or Windows.

[COMMENT] It's common to use a virtual machine as your workstation. Just make sure your VM meets the [system requirements](https://docs.chef.io/install_dk.html#review-prerequisites).

Install ChefDK on your workstation now if you haven't already.

<a class='accent-button radius' href='https://downloads.chef.io/chef-dk/' target='_blank'>Install ChefDK&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

winrm identify -r:http://52.27.16.29:5985 -auth:basic -u:Administrator -p:2wiD.)2.!dX -encoding:utf-8

knife winrm 52.27.16.29 chef-client --manual-list --winrm-user Administrator --winrm-password '2wiD.)2.!dX'


knife bootstrap windows winrm 52.27.16.29 --winrm-user Administrator --winrm-password '2wiD.)2.!dX' --node-name wnode2 --run-list 'recipe[hello_chef_server]'
