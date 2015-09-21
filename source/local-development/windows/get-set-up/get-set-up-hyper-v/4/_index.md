## 4. Ensure your workstation's execution policy allows scripts to run

Now let's ensure that your workstation's execution policy allows remote signed scripts to run. Doing so will enable Test Kitchen to run scripts when it creates new virtual machine instances.

From your workstation, run this PowerShell command.

```ps
$ Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
