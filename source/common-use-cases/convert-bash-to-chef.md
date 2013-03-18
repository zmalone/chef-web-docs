---
title: 'Bash &rarr; Chef'
long_title: 'Convert a Shell Script to a Chef Recipe'
order: 2
description: 'A very common use case with Chef is to take antiquated in-house bash scripts and convert them to idempotent Chef resources. This guide will walk you through converting a simple bash script into a robust Chef recipe.'
keywords: 'bash, bash to chef, chef to bash, convert, chef, opscode'
---

Convert a Shell Script to a Chef Recipe
=======================================
A very common use case with Chef is to take antiquated in-house bash scripts and convert them to idempotent Chef resources. This guide will walk you through converting a simple bash script into a robust Chef recipe.

---

##### Examine the Script
One of the most common mistakes made when converting a bash script to a Chef recipe is trying to convert the script "line-by-line". Instead, we recommend asking yourself the question: "What does this script do?" We will be using the slightly modified [bash script from snipplr](http://snipplr.com/view/49047/) below:

```bash
sudo apt-get install apache2
sudo apt-get install php5 libapache2-mod-php5
sudo /etc/init.d/apache2 restart
sudo apt-get install mysql-server
mysql -u root -p
sudo apt-get install libapache2-mod-auth-mysql php5-mysql phpmyadmin
sudo echo "extension=mysql.so" >> /etc/php5/apache2/php.ini
sudo /etc/init.d/apache2 restart
sudo echo "<?php phpinfo(); ?>" >> /var/www/info.php

# Visit http://localhost/info.php
```

We can see that this simple script installs a Web server, PHP, and MySQL. It then instructs the user to visit a URL and see that PHP was successfully installed.

---

##### Break into Steps
It's important to create a list of tasks and organize your thoughts before tackling the recipe. If, in your refactoring, you find this list is too long, you should consider breaking the recipe into smaller pieces and using the `include_recipe` directive.

1. Install apache2
1. Install php
1. Install mysql
1. Install phpmyadmin
1. Configure php to use mysql
1. Create an `info.php` page with content

---

##### Map Steps to Tasks
While you could easily use the `package` resource to install all of these things, you should **always** check the community site for a more feature-complete solution. In this case, most of our use cases are covered with existing community cookbooks:

1. Install apache2 - [community](http://community.opscode.com/cookbooks/apache2)
1. Install php - [community](http://community.opscode.com/cookbooks/php)
1. Install mysql - [community](http://community.opscode.com/cookbooks/mysql)
1. Install phpmyadmin - [community](http://community.opscode.com/cookbooks/phpmyadmin)
1. Configure php to use mysql - [community](https://github.com/opscode-cookbooks/php#deprecated-recipes)
1. Create an `info.php` page with content

---

##### Write the Recipe
1. Create the new cookbook:

        $ knife cookbook create shell_to_chef

1. Open the `metadata.rb` in your favorite editor and add those community cookbooks as dependencies:

    ```ruby
    # cookbooks/shell_to_chef/metadata.rb
    # ...

    depends 'apache2'
    depends 'mysql'
    depends 'php'
    depends 'phpmyadmin'
    ```

1. If you're using Hosted Chef, you'll need to make sure those cookbooks are installed and available on the Chef Server. If you're using Chef Solo, make sure they are in your path.

1. Open the default recipe (`recipes/default.rb`) and use the `include_recipe` directive to include the necessary components from the other cookbooks:

    ```ruby
    # cookbooks/shell_to_chef/recipes/default.rb

    include_recipe 'apache2'
    include_recipe 'mysql::client'
    include_recipe 'mysql::server'
    include_recipe 'php'
    include_recipe 'php::module_mysql'
    include_recipe 'phpmyadmin'
    ```

  This really includes everything we need except the `info.php` file. It installs Apache 2, MySQL Server and MySQL Client, PHP, PHP MySQL modules, and phpmyadmin.

1. Create and use the `info.php` template:

    ```ruby
    # cookbooks/shell_to_chef/templates/default/info.php

    <?php php_info(); ?>
    ```

    ```ruby
    # cookbooks/shell_to_chef/recipes/default.rb
    # ...

    template '/var/www/info.php' do
      source 'info.php'
    end
    ```

1. That's it! You've succesfully converted a bash script into a simple Chef recipe.

---

##### Afterthoughts
What are the advantages of converting this bash script into a Chef recipe?

1. **Idempotency** - Since Chef is idempotent (meaning you can apply an operation multiple times and always receive the same end result), you don't have to worry if Apache was already installed. Because Chef is idempotent by nature, it will only install Apache if necessary. The same is true for PHP and MySQL in this example.
2. **Reusability & Cross Platform** - The original shell script was specifically for Ubuntu, but what about Centos, Solaris, RedHat, or even Windows? Chef is cross-platform, which means the same recipe will run on multiple operating systems with little to no effort on your part.
3. **Versioning** - With everything in your Chef repo, you leverage the power of git and version control; but you were probably already doing that with your shell scripts. Chef adds an additional versioning layer to each cookbook. Every cookbook version is a unique artifact, meaning you can freeze its contents and follow Semantic Versioning in your organization.