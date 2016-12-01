current_dir = File.dirname(__FILE__)
log_level                 :info
log_location              STDOUT
node_name                 "admin"
client_key                "#{current_dir}/admin.pem"
chef_server_url           "https://ec2-54-197-35-245.compute-1.amazonaws.com/organizations/4thcoffee"
cookbook_path             ["#{current_dir}/../cookbooks"]
