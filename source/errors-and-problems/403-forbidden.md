---
title: "403 Forbidden"
long_title: 'Net::HTTPServerException: 403 "Forbidden"'
description: ""
order: 2
keywords: "common errors, Net::HTTPServerException, forbidden, client.pem not found"
---

# Chef 403 "Forbidden"

If you're seeing output like this:

```bash
FATAL: Stacktrace dumped to /var/chef/cache/chef-stacktrace.out
FATAL: Net::HTTPServerException: 403 "Forbidden"
```

this is an indication that there is an issue with permissions on the Chef server.

- - -

##### Troubleshooting

In Chef, there are two different types of permissions issues, object specific and global permissions. To figure out which type of permission issue you're experiencing, run `chef-client` again with `-l debug` to see debugging output.

You should see something like this up the stack trace:

```bash
DEBUG: Sending HTTP Request to https://api.opscode.com/organizations/ORGNAME/nodes
ERROR: Running exception handlers
```

The URL will help you determine the type of permission issue. If the URL is an index action (i.e. operating on a collection of resources, like `/nodes`) then this is a global permission. If the URL is operating on an instance of a collection (i.e. `/nodes/NODENAME`) then this is an object permission issue.

- - -
To fix the global permissions:

1. Login to the [Opscode Management Console](https://manage.opscode.com) and click on the failing object type (most likely `node`)

2. Click on the permissions sub-tab. Which permission it needs, depends on which request that failed:

        GET - Under the group section, make sure it has the LIST permission checked
        POST - Under the group section, make sure it has the CREATE permission checked

3. Check the checkboxes needed and click on 'update permissions'.

- - -

To fix object permissions:

1. Login to the [Opscode Management Console](https://manage.opscode.com) and click on the failing object type (most likely `node`)

2. Click on the object in the list that is causing the error

3. Click on the permissions sub-tab. Which permission it needs, depends on the type of request that failed:

        GET - Make sure it has the READ permission checked
        PUT - Make sure it has the UPDATE permission checked
        DELETE - Make sure it has the DELETE permission checked

4. Click the 'update permissions' button



