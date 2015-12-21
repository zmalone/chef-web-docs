To configure the firewall, add the following to a shell script named <code class="file-path">firewall.sh</code>.

```ruby
# ~/firewall.sh
#!/bin/sh
# Flush all rules.
iptables -F

# Allow incoming and outgoing SSH, HTTP, and HTTPS traffic.
iptables -A INPUT -i eth0 -p tcp -m multiport --dports 22,80,443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp -m multiport --sports 22,80,443 -m state --state ESTABLISHED -j ACCEPT

# Set the default policy.
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow all traffic on the loopback interface.
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Accept packets belonging to established and related connections.
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

Then set execute permissions to make the script runnable.

```bash
$ chmod u+x firewall.sh
```

Now execute the script.

```bash
$ sudo ./firewall.sh
```

Restart the `iptables` service to apply the changes.

```bash
$ sudo service iptables restart
iptables: Setting chains to policy ACCEPT: filter          [  OK  ]
iptables: Flushing firewall rules:                         [  OK  ]
iptables: Unloading modules:                               [  OK  ]
```

Run the `curl` command a second time to verify network access.

```bash
$ curl -I http://www.cnn.com | grep HTTP/1.1
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0 88096    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
HTTP/1.1 200 OK
```

Finally, save the rules so that they are applied when the system boots.

```bash
$ sudo /etc/init.d/iptables save
iptables: Saving firewall rules to /etc/sysconfig/iptables:[  OK  ]
```
