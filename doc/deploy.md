# Deploying

Learn Chef is deployed to preprod and sandbox environments using
[Travis CI](https://travis-ci.org/). The files are hosted on
[Amazon S3](http://aws.amazon.com/s3/).

The bucket and user policies currently need to be set manually on the AWS
console. Preprod is on the chef-preprod account in the learn-preprod.getchef.com
bucket. Sandbox is on the chef-preprod account in the learn-sandbox.getchef.com
bucket.

Example policies are in this repo in the [data/aws](../data/aws) directory.

Preprod uses the _master_ branch and lives at http://learn-preprod.getchef.com.s3-website-us-east-1.amazonaws.com/

Sandbox uses the _sandbox_ branch and lives at http://learn-sandbox.getchef.com.s3-website-us-east-1.amazonaws.com/

## Deploying to the Sandbox

To deploy your special branch to the Sandbox environment:

```bash
git checkout -t origin/sandbox # or just `git checkout sandbox` if you've done this before
git reset --hard my-special-branch
git push --force origin sandbox
```

After Travis is done building, your content will be at the Sandbox URL shown
above.

## Redirects

The XML for redirection needs to be set manually in the bucket properties on the
S3 console. When the site is built, /website\_configuration.xml will be
generated using the routing rules in
[data/redirection\_rules.json](../data/redirection_rules.json).

The rules in this file are key-value pairs with the key being the "old" path on
Learn Chef (without a preceding or trailing slash) and the value being the new
place it should be redirected. The value should be the exact location of the
new address, including preceding and trailing slashes. If it's a full URL to an
external site it will be treated as such, but if it's just a path it will be the
new locations on Learn Chef.
