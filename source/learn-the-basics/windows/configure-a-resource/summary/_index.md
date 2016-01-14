## Summary

You ran a few basic Chef commands and got a flavor of what Chef can do. You learned that a resource describes one part of the system and its desired state. You worked with a [file][file], which is one kind of resource.

### Resources describe the what, not the how

A recipe is a file that holds one or more resources. Each resource declares _what_ state a part of the system should be in, but not _how_ to get there. Chef handles these complexities for you.

In this lesson, you declared that the file <code class="file-path">settings.ini</code> must exist and what its contents are, but you didn't specify how to create or write to the file. This layer of abstraction can not only make you more productive, but it can also make your work more portable across platforms.

### Resources have actions

When you deleted the file, you saw the `:delete` action.

Think of an action as the process that achieves the desired configuration state. Every resource in Chef has a default action, and it's often the most common affirmative one &ndash; for example, _create_ a file, _install_ a package, and _start_ a service.

When we created the file we didn't specify the `:create` action because `:create` is the default. But of course you can specify it if you want.

The documentation for each resource type, [file][file] for example, explains the type's default action.

### Recipes organize resources

In Chef, <code class="file-path">hello.rb</code> is an example of a [recipe][recipe], or an ordered series of configuration states. A recipe typically contains related states, such as everything needed to configure a web server, database server, or a load balancer.

Our recipe states everything we need to manage the INI file. You used `chef-client` in local mode to apply that recipe from the command line.

[file]: https://docs.chef.io/resource_file.html
[recipe]: https://docs.chef.io/recipes.html
