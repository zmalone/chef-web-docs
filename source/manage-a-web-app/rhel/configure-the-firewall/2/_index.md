## 2. Define the firewall rules

To use the `iptables` cookbook, you first create a template that defines the firewall rule. Then you use the `iptables_rule` resource to apply that rule.

We'll start by defining the rules. From your workstation, run the following commands to create two templates &ndash; the first to configure SSH access and the second to configure HTTP access.

```bash
# ~/chef-repo
$ chef generate template cookbooks/awesome_customers firewall_sshd
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/awesome_customers/templates/default] action create (up to date)
  * template[cookbooks/awesome_customers/templates/default/firewall_sshd.erb] action create
    - create new file cookbooks/awesome_customers/templates/default/firewall_sshd.erb
    - update content in file cookbooks/awesome_customers/templates/default/firewall_sshd.erb from none to e3b0c4
    (diff output suppressed by config)
$ chef generate template cookbooks/awesome_customers firewall_http
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/awesome_customers/templates/default] action create (up to date)
  * template[cookbooks/awesome_customers/templates/default/firewall_http.erb] action create
    - create new file cookbooks/awesome_customers/templates/default/firewall_http.erb
    - update content in file cookbooks/awesome_customers/templates/default/firewall_http.erb from none to e3b0c4
    (diff output suppressed by config)
```

Now add the corresponding `iptables` rules for SSH and HTTP to the template files you just created.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/templates/default/firewall_sshd.erb
# Port 22 for SSH
-A FWR -p tcp -m tcp --dport 22 -j ACCEPT
```

```ruby
# ~/chef-repo/cookbooks/awesome_customers/templates/default/firewall_http.erb
# Port 80 for HTTP
-A FWR -p tcp -m tcp --dport 80 -j ACCEPT
```
