If you see this error when trying to recreate the key, it's possible that the client itself was deleted.

You will need to create the validator key again and fix it's permissions by using the following directions. In these directions, ORGANIZATION should be replaced by your organizations short name.

1. Login to the [Opscode Management Console](https://manage.opscode.com)

1. Click on the 'clients' tab

1. Click on the 'create' sub-tab

1. Enter "ORGANIZATION-validator" as the name, substituting your organization's name, and click on the 'create' button

1. Click on the 'Download API Key' link to get a copy of the new ORGANIZATION-validator.pem

1. Save a copy of this private key in a save place - this will be your organization's new validator key

1. Now we will need to fix the permissions on the validator client

1. Click on the 'list' sub-tab

1. Click on the 'edit permissions' sub-tab

1. Check the 'create' and 'list' checkboxes for the ORGANIZATION-validator client and click on the 'update permissions' button


[INFO] Copy this key to your nodes and continue with the additional troubleshooting topics.
