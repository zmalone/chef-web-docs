## 7. Download the Starter Kit

Now you need to generate the configuration file, <code class="file-path">knife.rb</code>, that enables `knife` to authenticate commands with the Chef server. You also need to copy the RSA key (the <code class="file-path">.pem</code> file) that you created in the previous step to enable `knife` to authenticate calls to the Chef server. This authentication process ensures that the Chef server responds only to requests made by trusted users.

The easiest way to set up your `knife` configuration file and get a copy of your <code class="file-path">.pem</code> file is to download the Starter Kit from your Chef server. This is the same process you followed when you signed up for hosted Chef.

From your workstation,

1. From a web browser, navigate to your Chef server's hostname over HTTPS, for example, `https://my-chef-server`.
1. Sign in using the user name and password you provided in the previous step.
1. When prompted, enter the full name (for example, `Web development team`) and short name (for example, `webdev`) for your organization.  
1. From the **Administration** tab, select your organization.
1. Select **Starter Kit** from the menu on the left.
1. Click the **Download Starter Kit** button.
1. Click **Proceed**. Save the file <code class="file-path">chef-starter.zip</code> to your computer.
1. Extract <code class="file-path">chef-starter.zip</code> to your <code class="file-path">~/chef-repo</code> directory.

<a class="help-button radius" href="#" data-reveal-id="org-help-modal">What's an organization?</a>

<div id="org-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <p>The Chef server uses role-based access control (RBAC) to restrict access to objects such as users, nodes, data bags, cookbooks, and so on. An <em>organization</em> groups related objects to ensure authorized access to those objects.</p>

  <p>When the organization is created, Chef server generates a shared RSA private key that enables a node to validate itself when it communicates with the Chef server for the first time. This RSA key is different than the key Chef server created when you added the administrator account.</p>

  <p>During the bootstrap process, <code>knife</code> copies this private key from the Chef server to the node. After the node performs the initial validation, it then retrieves a new key that only it can use.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Now verify that the <code class="file-path">~/chef-repo/.chef</code> directory on your workstation contains knife configuration file and your RSA key.

```bash
# ~/chef-repo
$ ls ~/chef-repo/.chef
admin.pem                knife.rb                 learnchef-validator.pem
```
