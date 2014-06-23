# Deploying

Learn Chef is deployed using
[Travis CI](https://travis-ci.org/). The files are hosted on
[Amazon S3](http://aws.amazon.com/s3/).

The bucket and user policies currently need to be set manually on the AWS
console. Preprod is on the chef-preprod account in the learn-preprod.getchef.com
bucket. Sandbox is on the chef-preprod account in the learn-sandbox.getchef.com
bucket. Prod is on the Chef prod account and in the learn.getchef.com bucket.

Example policies are in this repo in the [data/aws](../data/aws) directory.
The data for prod can be pulled down using the bin/aws-data-export script.

Preprod uses the _master_ branch and lives at http://learn-preprod.getchef.com/

Sandbox uses the _sandbox_ branch and lives at http://learn-sandbox.getchef.com/

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

The redirects are set in config.rb and uploaded to S3 on deploy.

