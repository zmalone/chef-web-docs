```php
<?php
// ~/learn-chef/cookbooks/awesome_customers_ubuntu/templates/default/index.php.erb
$servername = "<%= node['awesome_customers_ubuntu']['database']['host'] %>";
$username = "<%= node['awesome_customers_ubuntu']['database']['admin_username'] %>";
$password = "<%= @database_password %>";
$dbname = "<%= node['awesome_customers_ubuntu']['database']['dbname'] %>";
```
