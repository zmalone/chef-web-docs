## 5. Delete the data bag item

We no longer need the `test` data bag item on the Chef server, so run the following command to delete it.

```bash
# ~/chef-repo
$ knife data bag delete passwords test
Do you really want to delete test? (Y/N)Y
Deleted data_bag_item[test]
```

Now confirm that the data bag item no longer exists on the Chef server.

```bash
# ~/chef-repo
$ knife data bag show passwords test
ERROR: The object you are looking for could not be found
Response: Cannot load data bag item test for data bag passwords
```
