## 2. Upload your cookbook to the Chef server

Run `knife` to upload the updated cookbook to the Chef server.

```bash
# ~\learn-chef
$ knife cookbook upload learn_chef_iis
Uploading learn_chef_iis          [0.2.1]
Uploaded 1 cookbook.
```

[COMMENT] It's a best practice to increment the version number every time you upload a modified version of your cookbook to the Chef server. We'll show you how in a later tutorial.