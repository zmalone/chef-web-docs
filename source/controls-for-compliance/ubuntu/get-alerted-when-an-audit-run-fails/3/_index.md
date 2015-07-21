## 3. Add rules that trigger an alert when an audit fails

Copy steps from other tutorial.

Name it 'Validate web services'.

 Add this code.

```ruby
rules 'Validate web services'
  rule on run_control
  when
    name = 'is not owned by the root user' and status != 'success'
  then
    alert:error('Run control group "{{ message.name }}" failed on {{ message.run.node_name }}.')
  end
end
```

Click **Save**.
