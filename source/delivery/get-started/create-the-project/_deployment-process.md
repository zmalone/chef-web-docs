The automated Delivery installation provides an Ubuntu node to run the `awesome_customers_delivery` cookbook during the Acceptance stage. This node is already bootstrapped to the Chef server and set up to run the `awesome_customers_delivery` cookbook.

If you're interested in using Delivery to deliver cookbooks, you may want to revisit this section later to better understand how the deployment process works. You can adapt a similar process or use a process that you prefer.

### Environments and push jobs

The deploy phase triggers `chef-client` to run on the node that's associated with the current stage, in our case an Ubuntu 14.04 server. The deploy phase's recipe, <code class='file-path'>deploy.rb</code>, is shared among the Acceptance, Union, Rehearsal, and Delivered stages. We use Chef [environments](https://docs.chef.io/environments.html) and [push jobs](https://docs.chef.io/push_jobs.html) to run `chef-client`.

A Chef environment enables you to control how a node behaves given that node's role in the overall lifecycle of your application or service. Think of an environment as a way to tag a node for a specific purpose.

Every pipeline phase is associated with the name of a Chef environment. For the Acceptance stage, the name comes in this form:

<code class='placeholder'>\<STAGE></code>-<code class='placeholder'>\<ENTERPRISE></code>-<code class='placeholder'>\<ORGANIZATION></code>-<code class='placeholder'>\<PROJECT></code>-<code class='placeholder'>\<PIPELINE></code>

For this project, the environment name during the Acceptance stage is:
 
**acceptance-delivery-demo-delivery-demo-awesome\_customers\_delivery-master**

where:

* **acceptance** is the current stage.
* **delivery-demo** is the enterprise and the organization.
* **awesome\_customers\_delivery** is the project.
* **master** is the pipeline.

A push job is a way to submit a task to a node, such as running `chef-client`. Running push jobs involves software components that exist on both the Chef server and on each node. 

### Connecting environments and push jobs to the Delivery project

Establishing the Chef environment and running the `chef-client` push job requires coordination between the bootstrap process and the build cookbook.

The process that creates the preconfigured Delivery setup runs [knife environment create](https://docs.chef.io/knife_environment.html#create) to create the environment on the Chef server. 

```bash
$ knife environment create acceptance-delivery-demo-delivery-demo-awesome_customers_delivery-master
```

On the Chef server, you would see this environment.

![](delivery/chef_server_acceptance_environment.png)

To see this on your Chef server, log in to the Chef server web interface at [https://10.0.0.11/organizations/delivery-demo](https://10.0.0.11/organizations/delivery-demo) from a browser on the Windows workstation. Use the credentials that match your SSH key pair's region.

<table>
  <tbody>
    <tr>
      <th>Region</th>
      <th>Username</th>
      <th>Password</th>
    </tr>
    <tr>
      <td>us-east-1 (N. Virginia)</td>
      <td><code>delivery</code></td>
      <td id="chef-server-us-east-1"><code>AjfXXMfhlv5fHVhOJOSzUpDLhTU=</code> <a data-copytarget="#chef-server-us-east-1" class='small-button radius'>Copy</a></td>
    </tr>
    <tr>
      <td>us-west-1 (N. California)</td>
      <td><code>delivery</code></td>
      <td id="chef-server-us-west-1"><code>d2GuUYUrYqLq2vzhVIulu7P+iII=</code> <a data-copytarget="#chef-server-us-west-1" class='small-button radius'>Copy</a></td>
    </tr>
    <tr>
      <td>us-west-2 (Oregon)</td>
      <td><code>delivery</code></td>
      <td id="chef-server-us-west-2"><code>jYaW0x4EenaZdxODWgtHkvnw/yE=</code> <a data-copytarget="#chef-server-us-west-2" class='small-button radius'>Copy</a></td>
    </tr>
  </tbody>
</table>

The process that creates the preconfigured Delivery setup also bootstraps the Ubuntu 14.04 instance to the Chef server, like this.

```bash
$ knife bootstrap 10.0.0.15 --node-name awesome_customers_delivery-acceptance \
--environment acceptance-delivery-demo-delivery-demo-awesome_customers_delivery-master \
--run-list "recipe[apt],recipe[delivery-base],recipe[awesome_customers_delivery]" \
--ssh-user ubuntu --sudo --identity-file /home/ec2-user/.ssh/USER.pem
```

The `--environment` argument associates the node with the environment created in the previous step. The `--run-list` argument includes the `awesome_customers_delivery` cookbook as well as the `delivery-base` cookbook in the node's run-list. The [delivery-base](https://github.com/chef-cookbooks/delivery-base) cookbook installs push jobs client on the node.

From your Chef server, you see this. 

![](delivery/chef_server_node_details.png)

With the Chef environment and push jobs set up, the build cookbook can trigger `chef-client` to run.

Here's the deploy recipe that `delivery-truck` defines. ([source](https://github.com/chef-cookbooks/delivery-truck/blob/master/recipes/deploy.rb))

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

This code uses [search](https://docs.chef.io/chef_search.html) to find the nodes that match the current Chef environment and contains at least one of the project's cookbooks.

Although we provide infrastructure for only the Acceptance stage, similar logic applies to the Union, Rehearsal, and Delivered stages. However, because the Union, Rehearsal, and Delivered stages can be shared among multiple projects, their environment names are `union`, `rehearsal`, and `delivered`, respectively.

For example, to prepare an Ubuntu server to run the `awesome_customers_delivery` cookbook in the Union stage, you would create an environment named `union` on your Chef server and then bootstrap your node to that environment.

```bash
$ knife environment create union
$ knife bootstrap 10.0.0.16 --node-name awesome_customers_delivery-union \
--environment union \
--run-list "recipe[apt],recipe[delivery-base],recipe[awesome_customers_delivery]" \
--ssh-user ubuntu --sudo --identity-file /home/ec2-user/.ssh/USER.pem
```

Because this mechanism finds all nodes that are associated with the current Chef environment, you can associate multiple nodes with a given stage, for example, to run a cookbook that configures a multi-tiered application. 