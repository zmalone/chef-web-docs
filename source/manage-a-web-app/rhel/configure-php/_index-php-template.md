```php
<?php
// ~/learn-chef/cookbooks/awesome_customers_rhel/templates/index.php.erb
$servername = "<%= node['awesome_customers_rhel']['database']['host'] %>";
$username = "<%= node['awesome_customers_rhel']['database']['admin_username'] %>";
$password = "<%= node['awesome_customers_rhel']['database']['admin_password'] %>";
$dbname = "<%= node['awesome_customers_rhel']['database']['dbname'] %>";
```
