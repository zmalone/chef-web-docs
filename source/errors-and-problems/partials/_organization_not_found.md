If you see this error when trying to recreate the key, it's possible that the client itself was deleted.

You will need to create the validator key again by using the following directions. In these directions, ORGANIZATION should be replaced by your organization's short name.

1. Login to the [Chef Management Console](https://manage.opscode.com)

1. Click on the 'Policy' tab

1. Click on the 'Clients' link on the left

1. Click on the 'Create' link on the left

1. Enter "ORGANIZATION-validator" as the name, substituting your organization's name, check the 'Validation Client' box and click on the 'Create Client' button

1. Save a copy of the private key to ORGANIZATION-validator.pem in your workstation's .chef directory - this will be your organization's new validator key

[INFO] Copy this key to your nodes and continue with the additional troubleshooting topics.
