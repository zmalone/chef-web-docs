## 3. Write the rule

```ruby
rules "Ensure FTP access is not permitted"
  rule on run_control
  when
    name = "is not running the vsftpd service" and
    status != "success"
  then
    alert:error("FTP is running on node \"{{ message.run.node_name }}\"")
  end

  rule on run_control
  when
    name = "is not listening on port 21" and
    status != "success"
  then
    alert:error("Port 21 is open on node \"{{ message.run.node_name }}\"")
  end
end
```
