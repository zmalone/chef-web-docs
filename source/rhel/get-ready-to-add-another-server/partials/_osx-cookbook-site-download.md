```bash
# ~/chef-repo/cookbooks
$ knife cookbook site download learnchef-rhel-webserver
Downloading learnchef-rhel-webserver from the cookbooks site at version 0.1.0 to /home/thomas/chef-repo/cookbooks/learnchef-rhel-webserver-0.1.0.tar.gz
Cookbook saved: /home/thomas/chef-repo/cookbooks/learnchef-rhel-webserver-0.1.0.tar.gz
$ tar -zxvf learnchef-rhel-webserver-0.1.0.tar.gz
learnchef-rhel-webserver/
learnchef-rhel-webserver/chefignore
learnchef-rhel-webserver/.kitchen.yml
learnchef-rhel-webserver/Berksfile
learnchef-rhel-webserver/metadata.rb
learnchef-rhel-webserver/metadata.json
learnchef-rhel-webserver/README.md
learnchef-rhel-webserver/templates/
learnchef-rhel-webserver/templates/default/
learnchef-rhel-webserver/templates/default/index.html.erb
learnchef-rhel-webserver/recipes/
learnchef-rhel-webserver/recipes/default.rb
$ mv learnchef-rhel-webserver webserver
$ rm learnchef-rhel-webserver-0.1.0.tar.gz
```