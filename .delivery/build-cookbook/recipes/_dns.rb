load_delivery_chef_config
aws_creds = encrypted_data_bag_item_for_environment('cia-creds','chef-secure')

route53_record fqdn do
  name "#{fqdn}."
  value 'g.global-ssl.fastly.net'
  aws_access_key_id aws_creds['access_key_id']
  aws_secret_access_key aws_creds['secret_access_key']
  type 'CNAME'
  zone_id aws_creds['route53'][DOMAIN_NAME]
  sensitive true
end

route53_record old_learn_fqdn do
  name "#{old_learn_fqdn}."
  value 'g.global-ssl.fastly.net'
  aws_access_key_id aws_creds['access_key_id']
  aws_secret_access_key aws_creds['secret_access_key']
  type 'CNAME'
  zone_id aws_creds['route53'][OLD_DOMAIN_NAME]
  sensitive true
end

route53_record old_opscode_fqdn do
  name "#{old_opscode_fqdn}."
  value 'g.global-ssl.fastly.net'
  aws_access_key_id aws_creds['access_key_id']
  aws_secret_access_key aws_creds['secret_access_key']
  type 'CNAME'
  zone_id aws_creds['route53'][OPSCODE_DOMAIN_NAME]
  sensitive true
end

Chef_Delivery::ClientHelper.leave_client_mode_as_delivery
