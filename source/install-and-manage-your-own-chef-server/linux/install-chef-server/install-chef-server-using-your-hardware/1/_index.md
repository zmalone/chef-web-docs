## 1. Prepare a system to run Chef server

First, bring up a system to run Chef server. Chef server runs on Red Hat Enterprise Linux/CentOS and Ubuntu. See the [supported platforms](https://docs.chef.io/install_server_pre.html#supported-platforms) to learn about which operating system versions Chef server supports.

Then review the [hardware and software system requirements](https://docs.chef.io/install_server_pre.html#hardware-software). Each requirement, including the amount of memory you need and which ports you need to open, is important. Pay special attention to any requirements that are specific to Red Hat Enterprise Linux/CentOS and Ubuntu.

The system requirements provide complete details on how to prepare your system for Chef server, but these checklists list the minimum amount required to get a Chef server up and running.

<a class="button radius" href="#" data-reveal-id="chef-server-el-prep-help-modal">Checklist for Red Hat Enterprise Linux</a> <a class="button radius" href="#" data-reveal-id="chef-server-ubuntu-prep-help-modal">Checklist for Ubuntu</a>

<div id="chef-server-el-prep-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Red Hat Enterprise Linux system, ensure that:</h3>
  <ul>
    <li>has 4GB total memory.</li>
    <li>has a hostname that can be accessed from your workstation and nodes.</li>
    <li>is connected to NTP.</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#apache-qpid">Apache Qpid</a> disabled.</li>
    <li>provides inbound access (including firewall) on port 443 (HTTPS).</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#selinux">SELinux</a> disabled or set to permissive mode.</li>
  </ul>
  <p>You may also want to open port 22 (SSH) so you can configure Chef server from your workstation.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

<div id="chef-server-ubuntu-prep-help-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
  <h3 id="modalTitle">To prepare your Ubuntu system, ensure that:</h3>
  <ul>
    <li>has 4GB total memory.</li>
    <li>has a hostname that can be accessed from your workstation and nodes.</li>
    <li>is connected to NTP.</li>
    <li>provides inbound access (including firewall) on port 443 (HTTPS).</li>
    <li>has <a href="http://docs.chef.io/install_server_pre.html#apparmor">AppArmor</a> disabled or set to complaining mode.</li>
  </ul>
  <p>You may also want to open port 22 (SSH) so you can configure Chef server from your workstation. Also, we recommend that you run <code>apt-get update</code> to update your local package cache.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>
