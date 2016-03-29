```yaml
# ~/learn-chef/cookbooks/settings-windows/.kitchen.yml
---
driver:
  name: ec2
  aws_ssh_key_id: <%= ENV['AWS_SSH_KEY_ID'] %>
  region: <%= ENV['AWS_REGION'] %>
  availability_zone: <%= ENV['AWS_AZ'] %>
  subnet_id: <%= ENV['AWS_SUBNET_ID'] %>
  instance_type: m1.small
  image_id: <%= ENV['AWS_AMI_ID'] %>
  security_group_ids: <%= ENV['AWS_SECURITY_GROUP_IDS'] %>
  retryable_tries: 120

provisioner:
  name: chef_zero_scheduled_task

transport:
  ssh_key: <%= ENV['AWS_SSH_KEY_PATH'] %>

platforms:
  - name: windows-2012r2

suites:
  - name: default
    run_list:
      - recipe[settings-windows::default]
    attributes:
```