## 1. Create the hello\_chef\_server cookbook

From the <code class="file-path">~/chef-repo</code> directory your workstation, run the following command to create the `hello_chef_server` cookbook.

```bash
# ~/chef-repo
$ chef generate cookbook cookbooks/hello_chef_server
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/home/user/chef-repo/cookbooks/hello_chef_server] action create
    - create new directory /home/user/chef-repo/cookbooks/hello_chef_server
  * template[/home/user/chef-repo/cookbooks/hello_chef_server/metadata.rb] action create_if_missing
    - create new file /home/user/chef-repo/cookbooks/hello_chef_server/metadata.rb
    - update content in file /home/user/chef-repo/cookbooks/hello_chef_server/metadata.rb from none to d531e8
    (diff output suppressed by config)
[...]
  * execute[initialize-git] action run
    - execute git init .
  * cookbook_file[/home/user/chef-repo/cookbooks/hello_chef_server/.gitignore] action create
    - create new file /home/user/chef-repo/cookbooks/hello_chef_server/.gitignore
    - update content in file /home/user/chef-repo/cookbooks/hello_chef_server/.gitignore from none to dd37b2
    (diff output suppressed by config)
```

Now write out your default recipe, <code class="file-path">default.rb</code>, like this. This recipe writes the file <code class="file-path">hello.txt</code> to the directory that Chef sets up for temporary files and data. This recipe works on both Linux and Windows Server.

```ruby
# ~/chef-repo/cookbooks/hello_chef_server/recipes/default.rb
file "#{Chef::Config[:file_cache_path]}/hello.txt" do
  content 'Hello, Chef server!'
end
```
