```php
<?php
// ~/learn-chef/cookbooks/awesome_customers_windows/templates/default/index.php.erb
$servername = "<%= node['awesome_customers_windows']['database']['host'] %>";
$username = "<%= node['awesome_customers_windows']['database']['admin_username'] %>";
$password = "<%= @database_password %>";
$dbname = "<%= node['awesome_customers_windows']['database']['dbname'] %>";
```
