## 4. Create the firewall recipe

Now you'll create a recipe named `firewall` that applies the firewall rules that you specified in your default node attributes file.

First, create a recipe named `firewall`.

```bash
# ~/learn-chef
$ chef generate recipe cookbooks/awesome_customers firewall
Compiling Cookbooks...
Recipe: code_generator::recipe
  * directory[cookbooks/awesome_customers_rhel/spec/unit/recipes] action create (up to date)
  * cookbook_file[cookbooks/awesome_customers_rhel/spec/spec_helper.rb] action create_if_missing (up to date)
  * template[cookbooks/awesome_customers_rhel/spec/unit/recipes/firewall_spec.rb] action create_if_missing
    - create new file cookbooks/awesome_customers_rhel/spec/unit/recipes/firewall_spec.rb
    - update content in file cookbooks/awesome_customers_rhel/spec/unit/recipes/firewall_spec.rb from none to 4dfc9c
    (diff output suppressed by config)
  * template[cookbooks/awesome_customers_rhel/recipes/firewall.rb] action create
    - create new file cookbooks/awesome_customers_rhel/recipes/firewall.rb
    - update content in file cookbooks/awesome_customers_rhel/recipes/firewall.rb from none to a74341
    (diff output suppressed by config)
```

Now add this to <code class="file-path">firewall.rb</code>.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/firewall.rb
include_recipe 'iptables::default'

node['awesome_customers']['enabled_firewall_rules'].each do |rule|
  iptables_rule rule do
    action :enable
  end
end
```

This code:

1. Applies the `iptables` default recipe, which ensures that `iptables` is installed and running and ensures that the `rebuild-iptables` script is installed.
1. Applies each firewall rule that you defined in your node attribute. For each firewall rule, the `iptables_rule` resource looks for a matching template file and applies that rule. For example, `iptables_rule 'firewall_http'` looks for a template file named <code path="file-path">firewall_http.erb</code> in your cookbook's <code class="file-path">templates</code> directory.

The second step is equivalent to this.

```ruby
# ~/learn-chef/cookbooks/awesome_customers_rhel/recipes/firewall.rb
iptables_rule 'firewall_http' do
  action :enable
end

iptables_rule 'firewall_sshd' do
  action :enable
end
```

But by defining the set of firewall rules to apply in your attributes file, you've created a process that's easier to maintain.
