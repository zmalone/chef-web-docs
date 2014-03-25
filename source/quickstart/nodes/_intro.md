# Managing Nodes

To complete the final stage of Chef set up, we’ll need a Node to manage.

[Nodes](/concepts/nodes) represent the servers in your infrastructure. A node may take many different forms:

* Physical servers
* Virtual machines (VMs)
* Compute instances in a public or private cloud environment
* Network elements such as switches, routers etc.

Follow these last two steps to begin managing your first Node:

## Find a Suitable Machine for Chef to Manage

For purposes of this introductory tutorial, we are really just looking for a computer with an operating system that is connected to a network and for which we have sudo or root permissions.

Specific requirements include:

* Operating System: Centos 6+, Windows Server 2008+, Ubuntu 12.04+
* At least 512MB RAM
* At least 15GB disk
* Knowledge of the Hostname or IP Address of the server
* An SSH username, password, and port

If you do not have a machine handy, we have instructions for three platforms:
