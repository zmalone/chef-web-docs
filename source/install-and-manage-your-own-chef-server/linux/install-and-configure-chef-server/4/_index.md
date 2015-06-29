## 4. Create the administrator account and an organization

Now you need to create an administrator account and an organization, similar to what you did when you signed up for hosted Chef.

You'll need some information that you'll use in later steps, so let's repeat the process of setting a few environment variables that you can later refer to.

Add theses environment variables to <code class="file-path">~/.bash_profile</code> and restart `bash`.

| Environment variable            | Description | Examples |
|--------------------------------:|-------------|----------|
| `$CHEF_SERVER_ADMIN`            | user name for the administrator account | `jsmith`, `admin` |
| `$CHEF_SERVER_ADMIN_FIRST_NAME` | administrator's first name | `Joe` |
| `$CHEF_SERVER_ADMIN_LAST_NAME`  | administrator's last name | `Smith` |
| `$CHEF_SERVER_ADMIN_EMAIL`      | administrator's email | `joe.smith@example.com` |
| `$CHEF_SERVER_FULL_ORG_NAME`    | your organization's full name | `Learn Chef`, `Web development team` |
| `$CHEF_SERVER_SHORT_ORG_NAME`   | abbreviated nickname for your organization | `learnchef`, `webdev` |

<a class="help-button radius" href="#" data-reveal-id="set-admin-org-help-modal">Show me how!</a>

<div id="set-admin-org-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">Set the environment variables</h3>
<p>To set the environment variables and make the changes permanent, even after you reboot your server, open <code class="file-path">~/.bash_profile</code> from your text editor and append an <code>export</code> line for each environment variable, for example:</p>
<div class="window ">
              <nav class="control-window">
                <div class="close">&times;</div>
                <div class="minimize"></div>
                <div class="deactivate"></div>
              </nav>
              <h1 class="titleInside">Editor: ~/.bash_profile</h1>
              <div class="container"><div class="editor"><div class='highlight shell'><pre><table style="border-spacing: 0"><tbody><tr><td class="gutter gl" style="text-align: right"><pre class="lineno">1
2
3
4
5
6</pre></td><td class="code"><pre><span class="nb">export </span><span class="nv">CHEF_SERVER_ADMIN</span><span class="o">=</span>admin
<span class="nb">export </span><span class="nv">CHEF_SERVER_ADMIN_FIRST_NAME</span><span class="o">=</span>Joe
<span class="nb">export </span><span class="nv">CHEF_SERVER_ADMIN_LAST_NAME</span><span class="o">=</span>Smith
<span class="nb">export </span><span class="nv">CHEF_SERVER_ADMIN_EMAIL</span><span class="o">=</span>joe.smith@example.com
<span class="nb">export </span><span class="nv">CHEF_SERVER_FULL_ORG_NAME</span><span class="o">=</span>&quot;Learn Chef&quot;
<span class="nb">export </span><span class="nv">CHEF_SERVER_SHORT_ORG_NAME</span><span class="o">=</span>learnchef<span class="w">
</span></pre></td></tr></tbody></table></pre></div></div></div></div>
<p>Then restart <code>bash</code> and confirm that your environment variable was properly written.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>$</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>. ~/.bash_profile</span><span class='line command'>echo $CHEF_SERVER_ADMIN $CHEF_SERVER_FULL_ORG_NAME</span><span class='line output'>admin Learn Chef</span></code></pre></td></tr></table></div></div>
    </div>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

### Create the admin account

From your Chef server, run the following command to create the administrator account. Replace `{password}` with an administrator password. Record your password somewhere safe &ndash; you'll need this later to log in to your Chef account from the Chef server web interface.

```bash
$ sudo chef-server-ctl user-create $CHEF_SERVER_ADMIN $CHEF_SERVER_ADMIN_FIRST_NAME $CHEF_SERVER_ADMIN_LAST_NAME $CHEF_SERVER_ADMIN_EMAIL {password} --filename $CHEF_SERVER_ADMIN.pem
```

The command generates an RSA private key (<code class="file-path">.pem</code> file) that enables you enables you to run `knife` commands against the Chef server as an authenticated user. You'll copy this file to your workstation in the next step. For now, verify that this private key was written to the current directory on your Chef server.

```bash
$ ls *.pem
admin.pem
```

### Create an organization

The Chef server uses role-based access control (RBAC) to restrict access to objects such as users, nodes, data bags, cookbooks, and so on. An _organization_ groups related objects to ensure authorized access to those objects.

Run this command to create your initial organization.

```bash
$ sudo chef-server-ctl org-create $CHEF_SERVER_SHORT_ORG_NAME "$CHEF_SERVER_FULL_ORG_NAME" --association $CHEF_SERVER_ADMIN
```

[COMMENT] You always create the initial administrator account and organization directly from the Chef server on the command line. Later, you can add additional users [on the command line](https://docs.chef.io/server_orgs.html) or [through the Chef management console](https://docs.chef.io/manage.html#admin).
