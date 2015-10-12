## Types of Testing

It is outside the scope of this post to cover the various types of testing in great detail. I’ll provide a general overview of two types of testing as they pertain to testing Chef cookbooks: unit and integration testing. It is left as a reader exercise to further research the types of testing. This [blog post](https://sethvargo.com/unit-testing-correctly/) by Seth Vargo is a good reference to start.

### Unit testing

The intent of unit testing is to confirm that given specific input, the recipe yields the expected output. Unit tests are meant to execute fast, and happen without converging the node, so they are done in the pre-convergence phase. Unit testing Chef cookbooks is done with ChefSpec. It is very important that one does not fall into the trap of testing that Chef itself works. For example, given a recipe that has the following resource:

```ruby
# webserver.rb
package 'httpd' do
  action :install
end
```

It may be tempting to write a unit test like this:

```ruby
# test.rb
it 'installs the httpd package' do
  expect(chef_run).to install_package('httpd')
end
```

The thing is, we **know** that the recipe will install the `httpd` package, because that is exactly how Chef works! However, depending on the node’s platform, the package name might be different. We can use unit tests to verify that on given platforms, specific package names will be installed (`httpd` on RHEL-family, `apache2` on Debian-family, using this example). For more detailed discussion about testing conditionals in ChefSpec, see [my blog post on the subject](http://jtimberman.housepub.org/blog/2015/01/12/quick-tip-testing-conditionals-in-chefspec/).

### Integration testing

The intent of integration testing is to verify that the end state of the system is in fact what we wanted after Chef converges the node so we can have a higher degree of confidence that our code is doing what we need. Integration testing Chef cookbooks is often performed in Test Kitchen through so called _bussers_ for various supported frameworks like Serverspec, BATS, or Minitest. See the respective sections below for specifics.
