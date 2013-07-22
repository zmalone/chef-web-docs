##### Create a Simple Cookbook
We leveraged the power of the [Community Site][apache2-cookbook] to install three cookbooks, but let's also write our own cookbook before bootstrapping our first node. It will add shell aliases and global environment variables to our node's shell.

[INFO] A system managed using Chef is refered to as a node.

1. Install the `magic_shell` cookbook using `knife`:

        $ knife cookbook site install magic_shell

1. Create a new cookbook called "aliases":

        $ knife cookbook create aliases

1. If you now look into the `cookbooks` directory you'll notice that a new directory, `aliases`, has been created. Open up the `metadata.rb` in a plain text editor and add a dependency on the `magic_shell` cookbook we installed earlier, at the bottom of the file:

    ``` ruby
    depends 'magic_shell'
    ```

    If you're not familiar with Chef, this allows us to leverage LWRP (light weight resource provider) functionality of the `magic_shell` cookbook inside our `aliases` cookbook (allowing us to create aliases on our node).

    [NOTE] If you don't have a plain text editor, download a [free trial of Sublime Text 2][sublime-text-2].
    
    [INFO] It's common practice to fill fields with your information, but unnecessary for this Quick Start guide.

1. Open up the default recipe for our new `aliases` cookbook (`chef-repo/cookbooks/aliases/recipes/default.rb`) in a text editor. Let's create some shell aliases for this recipe - feel free to use these or make up your own:

    ``` ruby
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
[sublime-text-2]: http://www.sublimetext.com/2 "Sublime Text 2"
