Throughout this and the previous tutorial, you saw how push jobs enable you to submit tasks, such as running `chef-client`, to your nodes.

Now that your `awesome_customers_delivery` cookbook is part of a Chef Automate pipeline, the `delivery-truck` cookbook can run these push jobs for you automatically when your cookbook changes.

To give you a sense of how `delivery-truck` does this, here's the deploy recipe that `delivery-truck` defines. ([source](https://github.com/chef-cookbooks/delivery-truck/blob/master/recipes/deploy.rb))

```ruby
# deploy.rb
# Send CCR requests to every node that is running this cookbook or any
# other one in the current project
search_terms = []
get_all_project_cookbooks.each do |cookbook|
  search_terms << "recipes:#{cookbook.name}*"
end

unless search_terms.empty?
  search_query = "(#{search_terms.join(' OR ')}) " \
                 "AND chef_environment:#{delivery_environment} " \
                 "AND #{deployment_search_query}"

  my_nodes = delivery_chef_server_search(:node, search_query)

  my_nodes.map!(&:name)

  delivery_push_job "deploy_#{node['delivery']['change']['project']}" do
    command 'chef-client'
    nodes my_nodes
  end
end
```

This code builds a query string and uses [search](https://docs.chef.io/chef_search.html) to find the nodes that match the current Chef environment and contains at least one of the project's cookbooks.

For this project, for example, during the Union stage the query string would be:

**(recipes:awesome\_customers\_delivery\*) AND chef\_environment:union AND recipes:\*push-jobs***

[delivery\_push_job](https://github.com/chef-cookbooks/delivery-sugar/blob/master/libraries/delivery_push_job.rb) is a Chef resource that submits a push job. It's behavior is similar to the `knife job start` command you can previously.

```ps
# C:\Users\Administrator
$ knife job start 'chef-client' --search '(recipes:awesome_customers_delivery*) AND chef_environment:union AND recipes:*push-jobs*'
```

Remember, because this mechanism finds all nodes that are associated with the current Chef environment, you can associate multiple nodes with a given stage, for example, to run a cookbook that configures a multi-tiered application.
