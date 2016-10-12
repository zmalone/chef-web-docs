require 'winrm'
require 'winrm-fs'

opts = {
  endpoint: 'http://54.163.31.72:5985/wsman',
  user: 'Administrator',
  password: '7pXySo%!Cz'
}
connection = WinRM::Connection.new(opts)
file_manager = WinRM::FS::FileManager.new(connection)
file_manager.upload('/tmp/ec2-52-23-164-34.compute-1.amazonaws.com.crt', 'C:/chef/trusted_certs/ec2-52-23-164-34.compute-1.amazonaws.com.crt')
