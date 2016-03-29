To configure the firewall using [firewalld](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html), run these commands.

```bash
$ sudo systemctl start firewalld
$ sudo systemctl enable firewalld
Created symlink from /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service to /usr/lib/systemd/system/firewalld.service.
Created symlink from /etc/systemd/system/basic.target.wants/firewalld.service to /usr/lib/systemd/system/firewalld.service.
$ sudo firewall-cmd --permanent --add-service={http,https}
success
$ sudo firewall-cmd --reload
success
```

Then run this command to verify the firewall configuration. You should see **http**, **https**, and **ssh** in the output. 

```bash
$ sudo firewall-cmd --list-all
public (default, active)
  interfaces: enp0s3
  sources:
  services: dhcpv6-client http https ssh
  ports:
  masquerade: no
  forward-ports:
  icmp-blocks:
  rich rules:
```

Run the `curl` command a second time to verify network access.

```bash
$ curl -I http://www.cnn.com | grep HTTP/1.1
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0 88096    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
HTTP/1.1 200 OK
```