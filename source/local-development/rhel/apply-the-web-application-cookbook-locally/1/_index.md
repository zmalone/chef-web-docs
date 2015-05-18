## 1. Get the web_application cookbook

You can skip this step if you already have the `web_application` cookbook on your workstation.

### Option 1: Download the zip file from GitHub

Download the `web_application` project as a zip file from GitHub and extract it to the <code class="file-path">~/manage-a-web-app-rhel</code> directory on your workstation.

<a class='accent-button radius' href='https://github.com/learn-chef/manage-a-web-app-rhel' target='_blank'>Download the web_application project&nbsp;&nbsp;<i class='fa fa-external-link'></i></a>

![Download a zip file from GitHub](tutorials/github-zip.png)

### Option 2: Clone the GitHub repo

If you're a Git user, you can also clone this repo from GitHub.

```bash
$ cd ~
$ git clone https://github.com/learn-chef/manage-a-web-app-rhel.git
```

[COMMENT] You can extract the zip file or clone the Git repo to a different directory if you'd like. Just remember to adjust the paths you see in this tutorial as needed.

### Encrypt your data bags

You'll also need to generate a new secret key and use it to encrypt the local version of your data bags.

First, run the command that matches your workstation setup to generate your secret key file.

### From a Linux or Mac OS workstation

```bash
# ~/chef-repo
$ openssl rand -base64 512 | tr -d '\r\n' > /tmp/encrypted_data_bag_secret
```

### From a Windows workstation

```ps
# ~\chef-repo
$ $key = New-Object byte[](512)
$ $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($key)
$ [Convert]::ToBase64String($key) | Out-File "C:\temp\encrypted_data_bag_secret" -encoding "UTF8"
$ [array]::Clear($key, 0, $key.Length)
```

Now, modify <code class="file-path">~/manage-a-web-app-rhel/chef-repo/data\_bags/passwords/sql\_server\_root\_password.json</code> by adding the SQL root password in plain text.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/data_bags/passwords/sql_server_root_password.json
{
  "id": "sql_server_root_password",
  "password": "learnchef_mysql"
}
```

Now modify <code class="file-path">~/manage-a-web-app-rhel/chef-repo/data\_bags/passwords/db\_admin.json</code> by adding the database password.

```ruby
# ~/manage-a-web-app-rhel/chef-repo/data_bags/passwords/db_admin.json
{
  "id": "db_admin",
  "password": "database_password"
}
```

First, encrypt your MySQL password locally.

### From a Linux or Mac OS workstation

```bash
# ~/manage-a-web-app-rhel/chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file /tmp/encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::sql_server_root_password]
$ knife data bag from file passwords db_admin.json --secret-file /tmp/encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::db_admin]
```

### From a Windows workstation

```ps
# ~\manage-a-web-app-rhel\chef-repo
$ knife data bag from file passwords sql_server_root_password.json --secret-file C:\temp\encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::sql_server_root_password]
$ knife data bag from file passwords db_admin.json --secret-file C:\temp\encrypted_data_bag_secret --local-mode
Updated data_bag_item[passwords::db_admin]
```
