## 3. Use Berkshelf to upload the web_application cookbook to the Chef server

Run `berks upload web_application` to upload the `web_application` cookbook to the Chef server.

```bash
# ~/chef-repo/cookbooks/web_application
$ berks upload web_application
Uploaded web_application (0.3.0) to: 'https://api.opscode.com:443/organizations/your-org-name'
```

As before, the `web_application` cookbook was uploaded because its version has changed.
