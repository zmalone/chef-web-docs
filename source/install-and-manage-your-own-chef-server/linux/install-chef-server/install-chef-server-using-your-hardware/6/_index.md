## 6. Create the administrator account and an organization

Now you need to create an administrator account and an organization, similar to what you did when you signed up for hosted Chef.

You'll need some information that you'll use in later steps, so jot down the following details about yourself and your organization. You'll replace these values in the commands that follow.

| Item                | Description |    Notes and examples |
|----------------------------------:|------------|----------|
| `ADMIN_USER_NAME`  | user name for the administrator account | `jsmith`, `admin` |
| `ADMIN_PASSWORD`   | password for the administrator account | Note your password somewhere safe! |
| `ADMIN_FIRST_NAME` | administrator's first name | `Joe` |
| `ADMIN_LAST_NAME`  | administrator's last name | `Smith` |
| `ADMIN_EMAIL`      | administrator's email address | `joe.smith@example.com` |

### Create the admin account

From your Chef server, run the following command to create the administrator account. Replace `ADMIN_USER_NAME`, `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` with your values.

```bash
$ sudo chef-server-ctl user-create ADMIN_USER_NAME ADMIN_FIRST_NAME ADMIN_LAST_NAME ADMIN_EMAIL ADMIN_PASSWORD --filename ADMIN_USER_NAME.pem
```

The command generates an RSA private key (<code class="file-path">.pem</code> file) that enables you enables you to run `knife` commands against the Chef server as an authenticated user. You'll copy this file to your workstation in the next step. For now, verify that this private key was written to the current directory on your Chef server.

```bash
$ ls *.pem
admin.pem
```

[COMMENT] You always create the initial user account directly from the Chef server on the command line. Later, you can add additional users [from the command line](https://docs.chef.io/server_orgs.html) or [through the management console](https://docs.chef.io/manage.html#admin).
