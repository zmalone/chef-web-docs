## 4. Use Berkshelf to upload the web_application cookbook

Because we know that only `web_application` needs to be uploaded to the Chef server, we can add it as an argument to the `berks upload` command. Run it like this.

```bash
# ~/chef-repo/cookbooks/web_application
$ berks upload web_application
Uploaded web_application (0.2.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

The `web_application` cookbook was uploaded because its version has changed.
