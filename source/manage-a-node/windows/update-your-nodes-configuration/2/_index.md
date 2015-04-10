## 2. Upload your cookbook to the Chef server

Run `knife` to upload the updated cookbook to the Chef server.

```bash
# ~\chef-repo
$ knife cookbook upload learn_chef_iis
Uploading learn_chef_iis          [0.2.0]
Uploaded 1 cookbook.
```

[COMMENT] It's a best practice to increment the version number every time you upload a modified version of your cookbook to the Chef server. We'll show you how in the next tutorial.
