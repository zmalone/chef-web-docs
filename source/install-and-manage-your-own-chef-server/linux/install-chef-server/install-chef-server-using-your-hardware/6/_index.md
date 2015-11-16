## 6. Create the administrator account and an organization

Now you need to create an administrator account and an organization, similar to what you did when you signed up for hosted Chef.

The Chef server uses role-based access control (RBAC) to restrict access to objects such as users, nodes, data bags, cookbooks, and so on. An <em>organization</em> groups related objects to ensure authorized access to those objects.

You'll need some information that you'll use in later steps, so jot down the following details about yourself and your organization. You'll replace these values in the commands that follow.

| Item                | Description |    Notes and examples |
|----------------------------------:|------------|----------|
| <code class="placeholder">ADMIN\_USER\_NAME</code>  | user name for the administrator account | `jsmith`, `admin` |
| <code class="placeholder">ADMIN\_PASSWORD</code>   | password for the administrator account | Note your password somewhere safe! |
| <code class="placeholder">ADMIN\_FIRST\_NAME</code> | administrator's first name | `Joe` |
| <code class="placeholder">ADMIN\_LAST\_NAME</code>  | administrator's last name | `Smith` |
| <code class="placeholder">ADMIN\_EMAIL</code>      | administrator's email address | `joe.smith@example.com` |
| <code class="placeholder">ORG\_FULL\_NAME</code> | your organization's full name | `Fourth Coffee, Inc.` |
| <code class="placeholder">ORG\_SHORT\_NAME</code> | your organization's abbreviated name | `4thcoffee` |

### Create the admin account

From your Chef server, run the following command to create the administrator account. Replace <code class="placeholder">ADMIN\_USER\_NAME</code>, <code class="placeholder">ADMIN\_FIRST\_NAME</code>, <code class="placeholder">ADMIN\_LAST\_NAME</code>, <code class="placeholder">ADMIN\_EMAIL</code>, and <code class="placeholder">ADMIN\_PASSWORD</code> with your values.

```bash
$ sudo chef-server-ctl user-create ADMIN_USER_NAME ADMIN_FIRST_NAME ADMIN_LAST_NAME ADMIN_EMAIL ADMIN_PASSWORD --filename ADMIN_USER_NAME.pem
```

For example:

```bash
$ sudo chef-server-ctl user-create jsmith Joe Smith joe.smith@example.com p4ssw0rd --filename jsmith.pem
```

The command generates an RSA private key (<code class="file-path">.pem</code> file) that enables you enables you to run `knife` commands against the Chef server as an authenticated user. You'll copy this file to your workstation in the next step. For now, verify that this private key was written to the current directory on your Chef server.

```bash
$ ls *.pem
jsmith.pem
```

[COMMENT] You always create the initial user account directly from the Chef server on the command line. Later, you can add additional users [from the command line](https://docs.chef.io/server_orgs.html) or [through the management console](https://docs.chef.io/manage.html#admin).

### Create the organization

From your Chef server, run the following command to create the organization. Replace <code class="placeholder">ORG\_SHORT\_NAME</code>, <code class="placeholder">ORG\_LONG\_NAME</code>, and <code class="placeholder">ADMIN\_USER\_NAME</code> with your values.

```bash
$ sudo chef-server-ctl org-create ORG_SHORT_NAME "ORG_LONG_NAME" --association_user ADMIN_USER_NAME
```

For example:

```bash
$ sudo chef-server-ctl org-create 4thcoffee "Fourth Coffee, Inc." --association_user jsmith
```

[COMMENT] You can ignore the RSA private key that `chef-server-ctl org-create` writes to the console. In prior versions of `chef-client`, you would use this private key during the bootstrap process to enable a node to authenticate itself for the first time with the Chef server. Newer versions of `chef-client` use your client key to perform the initial authentication. [Learn more](https://www.chef.io/blog/2015/04/16/validatorless-bootstraps/).
