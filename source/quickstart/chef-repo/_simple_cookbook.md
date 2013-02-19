##### Create a Simple Cookbook
We leveraged the power of the [Community Site][apache2-cookbook] to install 2 cookbooks, but let's also write our own cookbook before bootstrapping our first node. We will be adding shell aliases and global environment variables.

1. Install the `magic_shell` cookbook using `knife`:

        $ knife cookbook site install magic_shell

1. Create a new cookbook called "aliases":

        $ knife cookbook create aliases

1. If you expand the `cookbooks` folder you'll notice that a new folder `aliases` has been created. Open up the `metadata.rb` in your editor and add a dependency on `magic_shell` at the bottom of the file:

    ```ruby
    depends 'magic_shell', '~> 0.2.0'
    ```

    If you're not familiar with Chef, this allows us to leverage the `magic_shell` LWRP inside our `aliases` cookbook.

    [INFO] It's best practice to fill fields with your information, but that's unnecessary for this Quick Start guide.

1. Open up the default recipe in your Text Editor (it's in `cookbooks/aliases/recipes/default.rb`). Let's create some shell aliases to this recipe - feel free to use these or make up your own:

    ```ruby
    # Alias `h` to go home
    magic_shell_alias 'h' do
      command 'cd ~'
    end

    # Alias `sites` to cd into apache
    magic_shell_alias 'sites' do
      command "cd #{node['apache']['dir']}/sites-enabled"
    end

    # Set Vim as the default editor
    magic_shell_environment 'EDITOR' do
      value 'vim'
    end
    ```

[apache2-cookbook]: http://community.opscode.com/cookbooks/apache2 "Opscode Apache2 Cookbook"
