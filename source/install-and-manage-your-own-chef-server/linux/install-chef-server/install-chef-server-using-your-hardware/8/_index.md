## 8. Download the Chef server's SSL certificate

Nodes communicate with the Chef server through a web service that's hosted on your Chef server. Communication occurs over an SSL connection (port 443), and Chef server uses a [X.509 digital certificate](https://en.wikipedia.org/wiki/X.509) to verify its authenticity.

During the bootstrap process, `knife` copies the certificate from your workstation to the node. In order to do that, you must first retrieve a copy of the certificate on your workstation.

Run the `knife ssl fetch` command from your workstation to retrieve a copy of the certificate.

```bash
# ~/chef-repo
$ knife ssl fetch
WARNING: Certificates from ec2-52-25-239-111.us-west-2.compute.amazonaws.com will be fetched and placed in your trusted_cert
directory (/home/user/chef-repo/.chef/trusted_certs).

Knife has no means to verify these are the correct certificates. You should
verify the authenticity of these certificates after downloading.

Adding certificate for ec2-52-25-239-111.us-west-2.compute.amazonaws.com in /home/user/chef-repo/.chef/trusted_certs/ec2-52-25-239-111_us-west-2_compute_amazonaws_com.crt
```

[COMMENT] If the command fails, verify that you have port 443 (HTTPS) open to incoming traffic on the Chef server.

Now run `knife ssl check` to verify that the certificate was properly retrieved and can be used to authenticate calls to the Chef server.

```bash
# ~/chef-repo
$ knife ssl check
Connecting to host ec2-52-27-41-27.us-west-2.compute.amazonaws.com:443
Successfully verified certificates from `ec2-52-27-41-27.us-west-2.compute.amazonaws.com'
```

[COMMENT] By default, Chef server uses a self-signed certificate, which is fine for getting started or for creating test servers. In production, we recommend that you use a [certificate signed by a root Certificate Authority (CA)](https://osxdominion.wordpress.com/2015/02/25/configuring-chef-server-12-to-use-trusted-ssl-certs/).
