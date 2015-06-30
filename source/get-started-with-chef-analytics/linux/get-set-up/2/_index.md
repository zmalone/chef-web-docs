## 2. Prepare your system to run Chef Analytics

Review and perform the [prerequisites](https://docs.chef.io/install_analytics.html#prerequisites) for running Chef Analytics. Chef server runs on Red Hat Enterprise Linux, CentOS, Oracle Linux, and Ubuntu.

The system requirements for Chef Analytics are similar to that for running Chef server. [Use these checklists](/install-and-manage-your-own-chef-server/linux/get-set-up/#4prepareasystemtorunchefserver) to help verify you have everything you need. Also keep in mind these additional requirements:

* Your Chef Analytics server must have 8GB of total memory.
* Be sure that port 25 (SMTP) and 5672 (for RabbitMQ) are open for outbound traffic through your firewall on your Chef Analytics server.
