## 2. Set the user's data attributes

Now let's define the `web_admin` user. To do this, we'll use the built-in [group](https://docs.chef.io/resource_group.html) and [user](https://docs.chef.io/resource_user.html) resources. One way to define the `web_admin` user is like this. Don't add this code just yet.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/user.rb
group 'web_admin'

user 'web_admin' do
  group 'web_admin'
  system true
  shell '/bin/bash'
end
```

One problem with this approach is that if you ever want to change the user name or group, you'll have to do it in this recipe and any other recipes that reference those names.

To keep things more manageable, it's a common practice to separate the logic of your recipe from its data and define that data in another place. To do that, we'll define custom _node attributes_.

### Create the custom attributes file

In [Learn to manage a node](/manage-a-node/rhel/), you learned about some of the built-in node attributes that Chef provides, such as the node's IP address. You can also define your own custom attributes that are specific to your policy. Let's create an attributes file that will define all of the custom attributes for your web application cookbook.

Run the following to create an attributes file named <code class="file-path">default.rb</code>.

```bash
# ~/chef-repo
$ chef generate attribute cookbooks/awesome_customers default
Compiling Cookbooks...
Recipe: code_generator::attribute
  * directory[cookbooks/awesome_customers/attributes] action create
    - create new directory cookbooks/awesome_customers/attributes
  * template[cookbooks/awesome_customers/attributes/default.rb] action create
    - create new file cookbooks/awesome_customers/attributes/default.rb
    - update content in file cookbooks/awesome_customers/attributes/default.rb from none to e3b0c4
    (diff output suppressed by config)
```

This command added the <code class="file-path">default.rb</code> attribute file to the <code class="file-path">~/chef-repo/cookbooks/awesome_customers/attributes</code> directory.

Add the following to <code class="file-path">default.rb</code>.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/attributes/default.rb
default['awesome_customers']['user'] = 'web_admin'
default['awesome_customers']['group'] = 'web_admin'
```
