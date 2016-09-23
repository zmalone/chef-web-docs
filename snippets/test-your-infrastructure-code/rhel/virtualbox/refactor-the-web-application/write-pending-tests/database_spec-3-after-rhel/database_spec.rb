it 'sets the MySQL service root password' do
  expect(chef_run).to create_mysql_service('default')
    .with(initial_root_password: 'fake_root_password')
end