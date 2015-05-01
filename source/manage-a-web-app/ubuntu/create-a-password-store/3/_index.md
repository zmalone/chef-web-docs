## 3. Create the data bag

All data bags are stored in your Chef repo's <code class="file-path">data\_bags</code> directory. Each data bag is typically stored in a subdirectory of <code class="file-path">data\_bags</code>. `knife` understands this directory structure so you don't need to enter the full path when working with data bags from the command line.

In this step, you'll create a directory for your `passwords` data bag and create the data bag.

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
