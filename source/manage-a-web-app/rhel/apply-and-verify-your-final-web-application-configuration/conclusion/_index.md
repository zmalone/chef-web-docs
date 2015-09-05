In this tutorial, you set up a basic yet complete LAMP stack that includes a web server, database, and scripting. You used many of the skills you've already learned, such as how to write a cookbook, upload it to the Chef server, and run it multiple times on your bootstrapped node. But this scenario introduced just enough complexity to demonstrate many Chef usage patterns, such as how to use Berkshelf to manage cookbook dependencies and how to use encrypted data bags to work with sensitive data, such as passwords.

You now have a cookbook that you can reuse. Your individual recipes declare the _policy_ that you want to enforce, and your attributes define the _data_. You can reference your `awesome_customers` cookbook from another cookbook and override its attributes with the specific data you need.

[GITHUB] Get the final version of the `awesome_customers` cookbook [on GitHub](https://github.com/learn-chef/manage-a-web-app-rhel).

In the next tutorial, [Learn to develop your Red Hat Enterprise Linux infrastructure code locally](/local-development/rhel/), you'll learn how to speed up the development cycle by using Test Kitchen to configure your web application on a temporary virtual machine instance.

<p style="font-size: 14px; font-style: italic;">
This tutorial was adapted from <a href="http://misheska.com/blog/2013/06/16/getting-started-writing-chef-cookbooks-the-berkshelf-way/">Getting Started Writing Chef Cookbooks the Berkshelf Way</a>, by Mischa Taylor. It was updated for use with the Chef DK and the latest community cookbooks.
</p>
