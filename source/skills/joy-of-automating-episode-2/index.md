---
title: 'Episode 2: Scripts to Recipes with Python, Pip, and Django'
description: 'Converting the application installation and configuration instructions into tested recipes. How to Install Django from multiple sources: packages; pip; and virtualenv.'
order: 2
keywords: training, videos, screencasts
category: 'joy-of-automating'
layout: skills-topic
sections: []
icon: video.png
---

<iframe width="930" height="523" src="https://www.youtube.com/embed/vEfMLejGhS4?list=PL11cZfNdwNyORJfIYA8t07PRMchyDXIjq" frameborder="0" allowfullscreen></iframe>
<p/>

In this episode we focused on converting the installation of Django into tested recipes. We explored installing Django from multiple sources: packages; pip; and through virtualenv. Which lead us into writing integration tests and unit tests for the various recipes, defining multiple test kitchen suites, and git branch workflow. Near the end we started to define a custom resource within the cookbook to handle our requests to install packages through pip.

## Activity

In this episode we focus on taking the manual installation instructions found in [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-the-django-web-framework-on-ubuntu-14-04) and create a recipe that does the work for us.

* [How to Install The Django Web Framework](https://www.digitalocean.com/community/tutorials/how-to-install-the-django-web-framework-on-ubuntu-14-04)

The completed exercise can be found here: [https://github.com/chef-training/django](https://github.com/chef-training/django)

## Further activities

When you are done with the initial implementation we encourage you to challenge yourself by:

### Another installation

We walked through several installations. As an exercise walk through the final installation of [installing Django through git](https://www.digitalocean.com/community/tutorials/how-to-install-the-django-web-framework-on-ubuntu-14-04#development-version-install-through-git). You will need the [git](https://docs.chef.io/resource_git.html) resource.

### Custom resource

We started to write the [custom resource](https://docs.chef.io/custom_resources.html): `pip`. Finish it.

* Replace the hard-coded installation of Django with a [property](https://docs.chef.io/custom_resources.html#define-properties)
* Set that name_property to true for the property so it defaults to using the name of the resource
* Set the install action as the default action

Installing Django through git uses a specific pip flag. Provide support for it by:

* Defining a new attribute to specify a source location
* Within pip's install action choose whether to include that flag if the source attribute contains a value
