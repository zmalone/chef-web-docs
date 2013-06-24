---
title: 'Manage .pem Files'
video: 'https://www.youtube.com/embed/7n8ig6qJ5r0'
layout: 'screencast'
description: 'Download and install your knife.rb and validation.pem for Opscode Chef.'
keywords: 'knife.rb, username.pem, organization.pem, authentication, chef-repo, .chef'
---

The Chef server provides three files that must be in the Chef repository and are required when connecting to the Chef server:

    knife.rb              the configuration file which can be downloaded from the Organizations page
    ORG-validator.pem     the private key which can be downloaded from the Organizations page
    USER.pem              the private key which can be downloaded from the Change Password section of the Account Management page

1. Navigate to the [Opscode Management Console](https://manage.opscode.com/organizations)

1. Click the link to "Generate knife config"

1. Click the link to "Regenerate validation key"

1. Click "OK" in the confirmation dialog.

1. Click on your username in the top right.

1. Click the "Change Password" link.

1. Click the "Get a new key" button at the bottom of the page.

    [INFO] You have now downloaded the `.pem` files and a sample `knife.rb`.

1. Open a terminal and navigate to your project directory.

1. Create a `.chef` directory:

        $ mkdir .chef
1. Move the downloaded files to the `.chef` directory:

        $ mv ~/Downloads/knife.rb .chef/
        $ mv ~/Downloads/USER.pem .chef/
        $ mv ~/Downloads/ORG-validator.pem .chef/

1. Add the `.chef` directory to your `.gitignore` file, we do not want to store these sensitive files in our git repository.

        $ echo '.chef' >> .gitignore

1. Stage the .gitignore file:

        $ git add .gitignore

1. Commit the change:

        $ git commit -m "Add .chef to the .gitignore"

1. Push the change to github.com:

        $ git push origin master
