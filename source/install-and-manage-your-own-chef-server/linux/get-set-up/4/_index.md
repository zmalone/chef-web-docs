## 4. Prepare a system to run Chef server

First, bring up a system to run Chef server. Chef server runs on Red Hat Enterprise Linux, CentOS, Oracle Linux, and Ubuntu. See the [system requirements](https://docs.chef.io/install_server_pre.html) to learn about which operating system versions Chef server supports.

Then from your Chef server, review and perform the [system requirements](https://docs.chef.io/install_server_pre.html). Each prerequisite step, including the amount of memory you need and which ports you need to open, is important. Pay special attention to any requirements that are specific to CentOS, Red Hat Enterprise Linux, and Ubuntu.

The system requirements provide complete details on how to prepare your system for Chef server, but these checklists provide the minimum amount required to get a Chef server up and running.

<a class="help-button radius" href="#" data-reveal-id="chef-server-el-prep-help-modal">Checklist for Red Hat Enterprise Linux</a> <a class="help-button radius" href="#" data-reveal-id="chef-server-ubuntu-prep-help-modal">Checklist for Ubuntu</a>

<div id="chef-server-el-prep-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">Ensure that your Red Hat Enterprise Linux system:</h3>
  <ul>
    <li>has 4GB total memory.</li>
    <li>has a hostname that can be accessed from your workstation and nodes.</li>
    <li>is connected to NTP.</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#apache-qpid">Apache Qpid</a> disabled.</li>
    <li>provides inbound access (including firewall) on ports 80 (HTTP) and 443 (HTTPS).</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#selinux">SELinux</a> disabled or set to permissive mode.</li>
  </ul>
  <p>You may also want to open port 22 (SSH) so you can configure Chef server from your workstation. Also, we recommend that you run <code>yum update</code> to update your local package cache.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

<div id="chef-server-ubuntu-prep-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Ubuntu system, ensure that:</h3>
  <ul>
    <li>has 4GB total memory.</li>
    <li>has a hostname that can be accessed from your workstation and nodes.</li>
    <li>is connected to NTP.</li>
    <li>provides inbound access (including firewall) on ports 80 (HTTP) and 443 (HTTPS).</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#apparmor">AppArmor</a> disabled or set to complaining mode.</li>
  </ul>
  <p>You may also want to open port 22 (SSH) so you can configure Chef server from your workstation. Also, we recommend that you run <code>apt-get update</code> to update your local package cache.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
