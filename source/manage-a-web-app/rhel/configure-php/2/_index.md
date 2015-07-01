## 2. Write the PHP application

Now we need to update the default home page, <code class="file-path">index.php</code> to read each record from the `customers` database table and display it on the page.

Currently, your cookbook uses the `file` resource to directly set the contents of <code class="file-path">index.php</code>. Let's convert that to use a `template` resource.

Run this `chef generate template` command to create a home page template.

```bash
# ~/chef-repo
$ chef generate template cookbooks/awesome_customers index.php
Compiling Cookbooks...
Recipe: code_generator::template
  * directory[cookbooks/awesome_customers/templates/default] action create (up to date)
  * template[cookbooks/awesome_customers/templates/default/index.php.erb] action create
    - create new file cookbooks/awesome_customers/templates/default/index.php.erb
    - update content in file cookbooks/awesome_customers/templates/default/index.php.erb from none to e3b0c4
    (diff output suppressed by config)
```

Now, in <code class="file-path">webserver.rb</code>, find the `file` resource that sets up the home page.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Write the home page.
file "#{node['awesome_customers']['document_root']}/index.php" do
  content '<html>This is a placeholder</html>'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end
```

Replace that code with the following `template` resource.

```ruby
# ~/chef-repo/cookbooks/awesome_customers/recipes/webserver.rb
# Write the home page.
template "#{node['awesome_customers']['document_root']}/index.php" do
  source 'index.php.erb'
  mode '0644'
  owner node['awesome_customers']['user']
  group node['awesome_customers']['group']
end
```

Now we can write the PHP program. Add this to <code class="file-path">index.php.erb</code>.

```html
<!-- ~/chef-repo/cookbooks/awesome_customers/templates/default/index.php.erb -->
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
$password = "database_password";
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
