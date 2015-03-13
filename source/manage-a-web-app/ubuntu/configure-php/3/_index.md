## 4. Refactor the PHP application

One final bit of refactoring we'll do is to modify the PHP script to use our custom node attributes.

Find the part of the program that looks like this.

```php
<?php
// ~/chef-repo/cookbooks/web_application/templates/default/index.php.erb
$servername = "127.0.0.1";
$username = "db_admin";
$password = "customers_password";
$dbname = "products";

// [...]
```

Replace the values of the variables with the appropriate node attributes, like this:

```php
<?php
// ~/chef-repo/cookbooks/web_application/templates/default/index.php.erb
$servername = "<%= node['web_application']['database']['host'] %>";
$username = "<%= node['web_application']['database']['app']['username'] %>";
$password = "<%= node['web_application']['database']['app']['password'] %>";
$dbname = "<%= node['web_application']['database']['dbname'] %>";

// [...]
```
