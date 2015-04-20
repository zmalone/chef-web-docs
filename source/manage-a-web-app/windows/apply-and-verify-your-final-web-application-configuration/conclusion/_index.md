In this tutorial, you set up a basic yet complete LAMP stack that includes a web server, database, and scripting. You used many of the skills you've already learned, such as how to write a cookbook, upload it to the Chef server, and run it multiple times on your bootstrapped node. But this scenario introduced just enough complexity to demonstrate many Chef usage patterns, such as how to use Berkshelf to manage cookbook dependencies.

You now have a cookbook that you can reuse. Your individual recipes declare the _policy_ that you want to enforce, and your attributes define the _data_. You can reference your `web_application` cookbook from another cookbook and override its attributes with the specific data you need.

[GITHUB] Get the final version of the `web_application` cookbook <a href="https://github.com/learnchef/learn-chef/tree/master/cookbooks/manage-a-web-app/windows/chef-repo" target="_blank">on GitHub</a>.

Stay tuned for the next tutorial, where we'll show you how to scale your web application by distributing its functionality across multiple nodes. While you're waiting, this is a great time to check out the [Chef Fundamentals Series](/fundamentals-series/), where Technical Community Director Nathen Harvey covers the fundamentals of using Chef in a 6-part video series.

<p style="font-size: 14px; font-style: italic;">
This tutorial was adapted from <a href="http://misheska.com/blog/2013/06/16/getting-started-writing-chef-cookbooks-the-berkshelf-way/">Getting Started Writing Chef Cookbooks the Berkshelf Way</a>, by Mischa Taylor. It was updated for use with the ChefDK and the latest community cookbooks.
</p>
