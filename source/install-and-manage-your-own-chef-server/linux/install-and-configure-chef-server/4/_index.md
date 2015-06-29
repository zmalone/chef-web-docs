## 4. Create the administrator account and an organization

Now you need to create an administrator account and an organization, similar to what you did when you signed up for hosted Chef.

You'll need some information that you'll use in later steps, so jot down the following details about yourself and your organization. You'll replace these values in the commands that follow.

| Item                 | Description |    Examples |
|-----------------------------------:|-------------|----------|
| `{admin-username}`   | user name for the administrator account | `jsmith`, `admin` |
| `{admin-first-name}` | administrator's first name | `Joe` |
| `{admin-last-name}`  | administrator's last name | `Smith` |
| `{admin-email}`      | administrator's email address | `joe.smith@example.com` |
| `{full-org-name}`    | your organization's full name | `Learn Chef`, `Web development team` |
| `{short-org-name}`   | abbreviated nickname for your organization | `learnchef`, `webdev` |

You'll also need a password for your administrator account, so also make note of that somewhere safe.

### Create the admin account

From your Chef server, run the following command to create the administrator account. Replace `{admin-username}`, `{admin-first-name}`, `{admin-last-name}`, `{admin-email}`, and `{admin-password}` with your values.

```bash
$ sudo chef-server-ctl user-create {admin-username} {admin-first-name} {admin-last-name} {admin-email} {admin-password} --filename {admin-username}.pem
```

The command generates an RSA private key (<code class="file-path">.pem</code> file) that enables you enables you to run `knife` commands against the Chef server as an authenticated user. You'll copy this file to your workstation in the next step. For now, verify that this private key was written to the current directory on your Chef server.

```bash
$ ls *.pem
admin.pem
```

### Create an organization

The Chef server uses role-based access control (RBAC) to restrict access to objects such as users, nodes, data bags, cookbooks, and so on. An _organization_ groups related objects to ensure authorized access to those objects.

Run this command to create your initial organization, replacing `{short-org-name}`, `{full-org-name}` and `{admin-username}` with your values.

```bash
$ sudo chef-server-ctl org-create {short-org-name} "{full-org-name}" --association {admin-username}
```

When the organization is created, Chef server generates a shared RSA private key that enables a node to validate itself when it communicates with the Chef server for the first time. This RSA key is different than the key Chef server created when you added the administrator account.

During the bootstrap process, `knife` copies this private key from the Chef server to the node. After the node performs the initial validation, it then retrieves a new key that only it can use. 

[COMMENT] You always create the initial administrator account and organization directly from the Chef server on the command line. Later, you can add additional users [on the command line](https://docs.chef.io/server_orgs.html) or [through the Chef management console](https://docs.chef.io/manage.html#admin).
