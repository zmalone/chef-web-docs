## 1. Upload your cookbook to the Chef server

In [Learn to manage a Windows Server node](/manage-a-node/windows/), you ran the `knife cookbook upload` command to upload the Learn Chef IIS cookbook to your Chef server. We'll repeat the same process to upload your `awesome_customers` cookbook.

Run this command from anywhere under your <code class="file-path">~\chef-repo</code> directory to upload your cookbook to the Chef server.

```bash
# ~\chef-repo
$ knife cookbook upload awesome_customers
Uploading awesome_customers [0.1.0]
Uploaded 1 cookbook.
```
