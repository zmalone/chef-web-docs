## 4. Upload your cookbook to the Chef server

Now upload the Learn Chef IIS cookbook to your Chef server. Run this command from anywhere under your <code class="file-path">~/learn-chef</code> directory.

```bash
# ~/learn-chef
$ knife cookbook upload learn_chef_iis
Uploading learn_chef_iis    [0.2.1]
Uploaded 1 cookbook.
```

The output shows that the cookbook was successfully uploaded, but you can run the `knife cookbook list` command to confirm.

```bash
# ~/learn-chef
$ knife cookbook list
learn_chef_iis   0.2.1
```

You can also see the cookbook from [https://manage.chef.io/](https://manage.chef.io/). Select the **Policy** tab to show all available cookbooks.

![](misc/manage_iis_cookbook.png)