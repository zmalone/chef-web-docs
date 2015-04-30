## 3. Create the data bag and a data bag item

All data bags are stored in your Chef repo's <code class="file-path">data\_bags</code> directory. Each data bag is typically stored in a subdirectory of <code class="file-path">data\_bags</code>. `knife` understands this directory structure so you don't need to enter the full path when working with data bags from the command line.

In this step, you'll create a directory for your `passwords` data bag, create the data bag, and then add a data bag item.

First, create a directory to hold your data bag.

### From a Linux or MacOS workstation

```bash
# ~/chef-repo
$ mkdir -p data_bags/passwords
```

### From a Windows workstation

```ps
# ~\chef-repo
$ mkdir data_bags\passwords
```

Next, run the following command to create a data bag named `passwords`.

```bash
# ~/chef-repo
$ knife data bag create passwords
Created data_bag[passwords]
```

Now create a file named <code class="file-path">test.json</code> in your <code class="file-path">data_bags/passwords</code> directory and add this to it.

```ruby
# ~/chef-repo/data_bags/passwords/test.json
{
  "id": "test",
  "password": "learnchef"
}
```

Every data bag item has an `id` field that identifies it. `"password": "learnchef"` is the data in the form of a key-value pair. A data bag item can have multiple key-value pairs.

[TIP] Although standard JSON does not allow for comments, you can add comments to your data bag items. Comments can come in the form <code>// _your comment_</code> or <code>/* _your comment_ */</code>.

Now run the following command to generate the encypted data bag item. The `--secret-file` argument specifies the location of your secret key file that's used to perform the encryption.

```bash
# ~/chef-repo
$ knife data bag from file passwords test.json --secret-file /tmp/encrypted_data_bag_secret
Updated data_bag_item[passwords::test]
```
