## 1. Create a web server cookbook

To begin, run the following `chef generate cookbook` command from a working directory on your workstation. You can use the root directory of the [GitHub repo](https://github.com/learn-chef/manage-a-web-app-rhel) that you cloned in the previous lesson.

```bash
# ~
$ chef generate cookbook webserver_test
Compiling Cookbooks...
Recipe: code_generator::cookbook
  * directory[/Users/user/webserver_test] action create
    - create new directory /Users/user/webserver_test
[...]
  * cookbook_file[/Users/user/webserver_test/.gitignore] action create
    - create new file /Users/user/webserver_test/.gitignore
    - update content in file /Users/user/webserver_test/.gitignore from none to dd37b2
    (diff output suppressed by config)
```
