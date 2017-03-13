## Summary

Your web server is shaping up! With a [cookbook][cookbook] you're now better organized. A cookbook adds structure to your work. You can now author your HTML code in its own file and use  a [template][template] resource to reference it from your recipe.

You also saw the [run-list][run-list]. The run-list lets you specify which recipes to run, and the order in which to run them. This is handy once you have lots of cookbooks, and the order in which they run is important.

[COMMENT] Keep in mind that the web server cookbook you wrote in this lesson likely won't be the one you'd use in production. Only _you_ know the specific needs for your infrastructure. You bring your requirements and Chef provides the tools that help you meet them.

[cookbook]: https://docs.chef.io/cookbooks.html
[template]: https://docs.chef.io/resource_template.html
[run-list]: https://docs.chef.io/nodes.html#about-run-lists
