## 5. Authenticate access to Delivery's Git server

You must authenticate access to your Chef Delivery's Git server, which by default runs on port 8989.

Then run the `ssh` command like this. Enter 'yes' when prompted.

```bash
# ~/Development
$ ssh -l USER@ENTERPRISE -p 8989 IP_ADDRESS
```

Here's an example for a user named `sally` and an enterprise named `chef`.

```bash
# ~/Development
$ ssh -l sally@chef -p 8989 10.194.11.99
The authenticity of host '[10.194.11.99]:8989 ([10.194.11.99]:8989)' can't be established.
RSA key fingerprint is ba:db:0c:97:f8:d4:6d:0f:0b:57:0d:0f:0e:a4:15:01.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[10.194.11.99]:8989' (RSA) to the list of known hosts.
channel 0: protocol error: close rcvd twice
Hi sally@chef! You've successfully authenticated, but Chef Delivery does not provide shell access.
                      Connection to 10.194.11.99 closed.
```

Your workstation is now set up for use with Chef Delivery.
