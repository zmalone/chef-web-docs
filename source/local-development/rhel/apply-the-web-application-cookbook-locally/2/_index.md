## 2. Set up the Test Kitchen configuration file

Just like in the previous lesson, you need to tell Test Kitchen about the environment you want to run your cookbook in. Remember, when you create a cookbook using the `chef generate cookbook` command, Chef generates a Test Kitchen configuration file for you.

In addition to configuring Test Kitchen to create a CentOS 6.6 virtual machine, we'll also:

* assign an IP address in the private address space so that we can access the web application from the host machine. The private IP address space is a designated range whose traffic cannot be transmitted through the public Internet.
* specify the location of the data bags for our database passwords and our secret key so that Test Kitchen can copy them to the virtual machine.
* override the `node[web_application][passwords][secret_path]` attribute to the location where Test Kitchen copies our secret key on the virtual machine.

Edit your `web_application` cookbook's <code class="file-path">.kitchen.yml</code> file like this.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/cookbooks/web_application/.kitchen.yml
---
driver:
  name: vagrant
  network:
    - ["private_network", {ip: "192.168.33.33"}]

provisioner:
  name: chef_zero

platforms:
  - name: centos-6.6

suites:
  - name: default
    data_bags_path: "../../data_bags"
    run_list:
      - recipe[web_application::default]
    provisioner:
      encrypted_data_bag_secret_key_path: /tmp/encrypted_data_bag_secret
    attributes:
      web_application:
        passwords:
          secret_path: '/tmp/kitchen/encrypted_data_bag_secret'
```

[WINDOWS] On a Windows workstation, set `encrypted_data_bag_secret_key_path` to <code clas="file-path">C:\temp\encrypted\_data\_bag\_secret</code>.

Test Kitchen appends the <code class="file-path">kitchen</code> subdirectory to the `encrypted_data_bag_secret_key_path` path you specify, making the destination path <code class="file-path">/tmp/kitchen/encrypted\_data\_bag\_secret</code> on the virtual machine. Therefore, we need to override the `node[web_application][passwords][secret_path]` node attribute to point to the new location of the secret file on the virtual machine.
