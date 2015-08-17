## 3. Refactor the PHP application

We'll do one final bit of refactoring to modify the PHP script to use custom node attributes.

Find the part of the program that looks like this.

```php
<?php
// ~/chef-repo/cookbooks/awesome_customers/templates/default/index.php.erb
$servername = "127.0.0.1";
$username = "db_admin";
$password = "customers_password";
$dbname = "products";

// [...]
```

Replace the values of the variables with the appropriate node attributes, like this:

```php
<?php
// ~/chef-repo/cookbooks/awesome_customers/templates/default/index.php.erb
$servername = "<%= node['awesome_customers']['database']['host'] %>";
$username = "<%= node['awesome_customers']['database']['app']['username'] %>";
$password = "<%= node['awesome_customers']['database']['app']['password'] %>";
$dbname = "<%= node['awesome_customers']['database']['dbname'] %>";

// [...]
```
