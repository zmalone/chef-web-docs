```php
<?php
// ~/learn-chef/cookbooks/awesome_customers_rhel/templates/default/index.php.erb
$servername = "<%= node['awesome_customers_rhel']['database']['host'] %>";
$username = "<%= node['awesome_customers_rhel']['database']['admin_username'] %>";
$password = "<%= @database_password %>";
$dbname = "<%= node['awesome_customers_rhel']['database']['dbname'] %>";
```
