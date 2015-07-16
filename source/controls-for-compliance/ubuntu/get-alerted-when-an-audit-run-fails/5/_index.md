## 5. Update the run-list to disable FTP access

```bash
# ~/chef-repo
$ knife node show audit1 --run-list
audit1:
  run_list:
    recipe[firewall::default]
    recipe[basic_audit::enable_ftp]
    recipe[basic_audit::audit]
```

```bash
# ~/chef-repo
$ knife node run_list set audit1 'recipe[firewall::default], recipe[basic_audit::disable_ftp], recipe[basic_audit::audit]'
audit1:
  run_list:
    recipe[firewall::default]
    recipe[basic_audit::disable_ftp]
    recipe[basic_audit::audit]
```

When running `knife` from Windows PowerShell, surround the string with triple single quotes (''' '''), like this.

```ps
# ~/chef-repo
$ knife node run_list set audit1 '''recipe[firewall::default], recipe[basic_audit::disable_ftp], recipe[basic_audit::audit]'''
```
