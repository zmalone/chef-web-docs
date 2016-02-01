## 3. Create a data bag to hold your passwords

The first step to create a data bag is to create an object on the Chef server. Run the following command to create a data bag named `passwords`.

```bash
# ~/learn-chef
$ knife data bag create passwords
Created data_bag[passwords]
```

This command creates an object for the `passwords` data bag on the Chef server only &ndash; it does not create anything on your workstation.

The next step is to create a location on your workstation to hold the contents of the data bag. All data bags are stored in your Chef repo's <code class="file-path">data\_bags</code> directory. Each data bag is  stored in a subdirectory of <code class="file-path">data\_bags</code>. `knife` understands this directory structure so you don't need to enter the full path when working with data bags from the command line.

Now create a directory on your workstation for your `passwords` data bag.

```bash
# ~/learn-chef
$ mkdir data_bags/passwords
```

You now have a data bag object on your Chef server and a location in your Chef repo to store the items.
