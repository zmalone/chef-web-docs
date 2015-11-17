## 1. Upload your cookbooks to the Chef server

[CALLOUT networks/workstation.png] Perform this step from your workstation.

You already verified that your `audit` and `webserver` cookbooks behave as you expect on a local virtual machine, so let's begin by uploading these cookbooks to your Chef server.

Run this command from the <code class="file-path">~/chef-repo</code> directory on your workstation.

```bash
# ~/chef-repo
$ knife cookbook upload audit webserver
Uploading audit          [0.1.0]
Uploading webserver      [0.1.0]
Uploaded 2 cookbooks.
```
