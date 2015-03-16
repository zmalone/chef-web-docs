## 2. Write the PHP application

Now we need to update our default home page, <code class="file-path">index.php</code> to read each record from our `customers` database table and display it on the page.

Currently, our cookbook uses the `file` resource to directly set the contents of <code class="file-path">index.php</code>. Let's convert that to use a `template` resource.

Run this `chef generate template` command to create a home page template.

```bash
# ~/chef-repo
$ chef generate template cookbooks/web_application index.php
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/web_application/templates/default] action create (up to date)
  * template[cookbooks/web_application/templates/default/index.php.erb] action create
    - create new file cookbooks/web_application/templates/default/index.php.erb
    - update content in file cookbooks/web_application/templates/default/index.php.erb from none to e3b0c4
    (diff output suppressed by config)
```

Now, in <code class="file-path">webserver.rb</code>, find the `file` resource that sets up the home page.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/webserver.rb
# Write a default home page.
file "#{node['apache']['docroot_dir']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['web_application']['user']
  group node['web_application']['group']
end
```

Replace that code with the following `template` resource.

```ruby
# ~/chef-repo/cookbooks/web_application/recipes/webserver.rb
# Write a default home page.
template "#{node['apache']['docroot_dir']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['web_application']['user']
  group node['web_application']['group']
end
```

Now we can write our PHP program. Add this to <code class="file-path">index.php.erb</code>.

```php
<?php
// ~/chef-repo/cookbooks/web_application/templates/default/index.php.erb
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Customers</title>
    <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        font-family: sans-serif;
        padding: 5px;
      }
      table tr:nth-child(even) td {
        background-color: #95c7ea;
      }
    </style>
</head>
<body>
<?php
$servername = "127.0.0.1";
$username = "db_admin";
$password = "customers_password";
$dbname = "products";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform SQL query
$sql = "SELECT * FROM customers";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table>\n";
    // Output data of each row
    while($row = $result->fetch_assoc()) {
      echo "\t<tr>\n";
      foreach ($row as $col_value) {
          print "\t\t<td>$col_value</td>\n";
      }
      echo "\t</tr>\n";
    }
    echo "</table>";
} else {
    echo "0 results";
}

// Close connection
$conn->close();
?>
</body>
</html>
```
