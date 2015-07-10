## 8. Upload the hello\_chef\_server cookbook to the Chef server

Now run the following `knife cookbook upload` command to upload the `hello_chef_server` cookbook to your Chef server.

```bash
# ~/chef-repo
$ knife cookbook upload hello_chef_server
Uploading hello_chef_server [0.1.0]
Uploaded 1 cookbook.
```

The output confirms that the cookbook successfully uploaded to your Chef server, but you can also run the following command to verify this.

```bash
# ~/chef-repo
$ knife cookbook list
hello_chef_server   0.1.0
```
