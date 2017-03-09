##The event infrastructure automation stack

The automation stack is made up of three different products, each with its own area of responsibility. The following diagram shows the stack, and what each product does.

<img src="/assets/images/skills/continuous-availability-at-ibm/stack.png" style="width: 450px;"/>

Rich described the role of [IBM Cloud Orchestrator](http://www-03.ibm.com/software/products/en/ibm-cloud-orchestrator) (ICO). "The main functionality that IBM Cloud Orchestrator provides is the operating system (OS) provisioning. We're using KVM virtualization. ICO also controls the hardware. It lets us allocate disk and networks and the virtual servers. It's the whole virtualization layer. It does a little bit of orchestration just to get the Chef process kicked off."

Describing the rest of the automation stack, Brian continues, "ICO hands it off to [Chef](http://www.chef.io/). Chef manages the OS configuration, installs the middleware and does any sort of middleware configuration that's required. We use the same cookbooks for both our public and private cloud.

"After that, we hand it off to our top layer, which is [UrbanCode Deploy](http://www-03.ibm.com/software/products/en/ucdep) (UCD). All our subject matter experts, including ourselves, have access to this tool, to either push out applications or application configuration updates or to do things like updating Chef roles. (We consider that a deployment). All of our deploys are the same, whether it's an application or a Chef update."
