before do
  stub_command("mysql -h fake_host -u fake_admin -pfake_admin_password -D fake_database -e 'describe customers;'").and_return(false)
end