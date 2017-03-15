##Treat everything as code

If automation is to be truly effective, everything must be treated as code. The IBM team keeps their assets in [GitLab](https://about.gitlab.com/). They use [Packer](https://www.packer.io/) to generate images for their public cloud, their private cloud, [VirtualBox](https://www.virtualbox.org/), and [VMware](http://www.vmware.com/), all from a single source.

Anything installable that's pushed through the pipeline, whether it's SSL keys or binary files, is packaged as an [RPM](http://rpm5.org/) file. To create the packages the team uses [FPM](https://github.com/jordansissel/fpm/wiki) and [fpm-cookery](https://github.com/bernd/fpm-cookery), which helps automate FPM. The RPM packages are deployed to an RPM repo, where they're available to all the nodes. The relevant Chef cookbook is updated to point to the new RPM.

Team members do their development locally, then commit their work to source control. A commit triggers a [Jenkins job](https://jenkins-ci.org/), which uses [Vagrant](https://www.vagrantup.com/) and Chef to spin up a build instance, execute fpm-cookery, and then build the RPM package. That package is then deployed by UCD. 
