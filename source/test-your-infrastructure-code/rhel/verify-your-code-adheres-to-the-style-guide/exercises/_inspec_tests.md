```ruby
# default_spec.rb
describe package 'postfix' do
  it { should be_installed }
end

describe service 'postfix' do
  it { should be_enabled }
  it { should be_running }
end

describe file '/etc/postfix/main.cf' do
  its('contents') { should match /^mydomain = example.com$/ }
  its('contents') { should match /^myorigin = example.com$/ }
end

```