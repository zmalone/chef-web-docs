## 9. Test the connection to Chef server

From your workstation, run `knife client list` to verify that you can authenticate commands to the Chef server.

```bash
# ~/chef-repo
$ knife client list
4thcoffee-validator
```

<a class="help-button radius" href="#" data-reveal-id="chef-server-connect-help-modal">I got an error!</a>

<div id="chef-server-connect-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">If you get an error, verify that:</h3>
  <ul>
    <li>you can access the public hostname of your Chef server over an HTTPS connection from a web browser, for example, <br/>&nbsp;&nbsp;&nbsp;&nbsp;https://ec2-52-25-201-190.us-west-2.compute.amazonaws.com:443<br/>If you can't connect, ensure that port 443 is open to incoming traffic on your Chef server.</li>
    <li>you are running <code>knife</code> from the <code class="file-path">~/chef-repo</code> directory or a sub-directory.</li>
    <li>your <code class="file-path">~/chef-repo/.chef</code> directory contains your RSA key (a <code class="file-path">.pem</code> file) and a <code class="file-path">knife.rb</code> file.</li>
    <li>your RSA key is user-readable only.</li>
    <li>your Chef server meets the <a href="https://docs.chef.io/install_server_pre.html">prerequisites</a>.</li>
  </ul>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
