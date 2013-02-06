Part 2 - Working with Chef Repo
===============================
Prerequisite Steps
------------------
1. Sign up for a free [Chef Hosted account][chef-hosted] and download the `chef-repo` starter pack.

    **[Note]** Currently this does not happen. Use these alternative instructions and skip over #2:

            mkdir p ~/Development/ && git clone git@github.com ~/Development/chef-repo

    If you've already signed up for Chef Hosted, make sure you have your starter pack before continuing. If you've misplaced it, you can download another one from your [Management Console][management-console]. (Make sure to check your Downloads folder first)

1. Move the `chef-repo` folder to a more permanent location. Make a new folder in your home directory called "Development" and drag the entire `chef-repo` folder inside "Development". Your folder structure should look like this:

        \_ $HOME
          \_ Development
            \_ chef-repo

1. Open up Terminal (see Part 1 if you forget) and "Change Directory" (`cd`) into our `chef-repo`:

        cd ~/Development/chef-repo

    **[Note]** All the commands in the rest of this Quick Start guide should be run from this directory.

1. Initialize this repository under source version control with git. In Terminal:

        git init .

Working with chef-repo
----------------------
1. Open up the `chef-repo` in your favorite editor. If you don't have a plain text editor, download a [free trial of Sublime Text 2][sublime-text-2]. You should see something like this:

    ![Chef Repo Sublime Text 2](../assets/chef-repo-sidebar.png)

    The `.chef` directory is very important. These are **your** credentials for accessing the Chef Server. Do not share them with anyone else. Treat them like a password.

    You'll notice a lot of `README.md` files. These are for your reference - feel free to read them now, but that's not required to continue with this Quick Start guide.

1. Open up the `Gemfile` in your editor and add the following content:

    ```ruby
    source :rubygems

    gem 'chef', '~> 11.2'
    gem 'berkshelf', '~> 1.0'
    ```

1. Run the `bundle` command to install the dependencies listed in the `Gemfile`:

        bundle install

    This will install Chef and [Berskhelf][berkshelf] (a cookbook-dependency management tool).

1. Prepare our `chef-repo` for use with Berkshelf:

        bundle exec berks init

1. Save these changes to git:

        git add .
        git commit -m "Created initial bundle with Chef and Berkshelf"

1. Add two community cookbooks to your `Berksfile` (created by the last command in your `chef-repo`):

    ```ruby
    site :opscode

    cookbook 'apache2', '~> 1.4'
    cookbook 'networking_basic', '~> 0.0.5'
    ```

1. Run the `berks` command to install the cookbooks in our Berksfile:

        bundle exec berks install

    By default, the `chef-repo` includes the [apache2 cookbook][apache2-cookbook] in the Berksfile.

1. Save these changes to git:

        git add .
        git commit -m "Added apache2 and networking_basic to Berkshelf"

Create a Simple Cookbook
------------------------
We leveraged the power of [Berkshelf][berkshelf] and the [Community Site][apache2-cookbook], but let's also write our own cookbook before bootstrapping our first node. We will be adding shell aliases and global environment variables.

1. Add the `magic_shell` cookbook as a dependency in the `Berksfile`:

    ```ruby
    # ... existing cookbooks from earlier
    cookbook 'magic_shell', '~> 0.2.0'
    ```

1. Run the `berks` command to install:

        bundle exec berks install

    This will install the `magic_shell` cookbook on your local workstation.

1. Create a new cookbook. We'll call it "aliases":

        bundle exec knife cookbook create aliases

    You should see output like this:

        $ bundle exec knife cookbook create aliases
        ** Creating cookbook aliases
        ** Creating README for cookbook: aliases
        ** Creating CHANGELOG for cookbook: aliases
        ** Creating metadata for cookbook: aliases

1. Expand the `cookbooks` folder and notice that a new folder `aliases` has been created:

  ![Aliases Cookbook Sidebar](../assets/aliases-cookbook.png)

1. Open up the `metadata.rb` and add a dependency on `magic_shell` so we can use it in our cookbook:

    ```ruby
    name             'aliases'
    maintainer       'YOUR_COMPANY_NAME'
    maintainer_email 'YOUR_EMAIL'
    license          'All rights reserved'
    description      'Installs/Configures aliases'
    long_description IO.read(File.join(File.dirname(__FILE__), 'README.md'))
    version          '0.1.0'

    # add this
    depends 'magic_shell', '~> 0.2.0'
    ```

    If you're not familiar with Chef, this allows us to leverage the `magic_shell` cookbook inside our `aliases` cookbook.

    It's also a best practice to fill in the `maintainer` and `maintainer_email` with your information, but that's unnecessary for this Quick Start guide.

1. Open up the default recipe in your Text Editor (it's in `cookbooks/aliases/recipes/default.rb`). It should look like this:

    ```ruby
    #
    # Cookbook Name:: aliases
    # Recipe:: default
    #
    # Copyright 2013, YOUR_COMPANY_NAME
    #
    # All rights reserved - Do Not Redistribute
    #
    ```

1. Let's create some magic shell aliases - you can use these or make up your own:

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

    The comments are pretty self-explanatory, and these aliases are created for all users.

1. Save these changes to git:

        git add .
        git commit -m "Created aliases recipe"

Upload the Cookbooks
--------------------
In order for our nodes to download these cookbooks, we need to upload them to the Hosted Chef Server.

1. Upload our community cookbooks managed by Berkshelf:

        bundle exec berks upload

1. Upload our local cookbook with knife:

        bundle exec knife cookbook upload aliases

Recap
-----
We now have 3 recipes:

  1. `recipe[apache2]` - via Berkshelf
  1. `recipe[networking_basic]` - via Berkshelf
  1. `recipe[aliases]` - created ourselves

If you look at the git log, you can see all the changes we've made thus far:

    git log

We can add these to our `run_list` in [Part 3 of this Quick Start guide][part-3]!

[chef-hosted]: http://www.opscode.com/hosted-chef/ "Sign up for Hosted Chef"
[management-console]: http://manage.opscode.com "Opscode Management Console"
[sublime-text-2]: http://www.sublimetext.com/2 "Sublime Text 2"
[berkshelf]: http://berkshelf.com "Berkshelf"
[apache2-cookbook]: http://community.opscode.com/cookbooks/apache2 "Opscode Apache2 Cookbook"
[part-3]: ../Part+3+-+Converging+the+Node "Part 3 - Converging the Node"
