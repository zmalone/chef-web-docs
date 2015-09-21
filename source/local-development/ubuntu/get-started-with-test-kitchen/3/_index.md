## 3. Create the Test Kitchen instance

Now you'll provision a virtual machine to serve as your test environment. This is the `kitchen create` step in our workflow.

<img src="/assets/images/misc/local_dev_workflow1.png" style="box-shadow: none;" alt=""/>

We often call the set of virtual environments that's created by Test Kitchen simply a _kitchen_. Run `kitchen list` to see what's in the kitchen.

```bash
# ~/motd
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        <Not Created>
```

Our kitchen includes just one instance &ndash; an Ubuntu 14.04 virtual machine that's configured to run the `default` suite. The `Last Action` column shows that the virtual machine is not yet created.

<a class="help-button radius" href="#" data-reveal-id="test-matrix-modal">Learn more about test matrices</a>

<div id="test-matrix-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
<p>Remember, you can target more than one platform, and also define more than one suite. Test Kitchen multiplies the number of platforms by the number of suites, creating a <em>matrix</em> of test scenarios. For example, imagine that you have two suites &ndash; one named <code>development</code> and one <code>test</code> &ndash; and that you wish to target both Ubuntu 12.04 and Ubuntu 14.04. platforms. Your <code class="file-path">.kitchen.yml</code> file might look like this.</p>
<div class="window ">
              <nav class="control-window">
                <div class="close">&times;</div>
                <div class="minimize"></div>
                <div class="deactivate"></div>
              </nav>
              <h1 class="titleInside">Editor: ~/motd/.kitchen.yml
</h1>
              <div class="container"><div class="editor"><div class='highlight conf'><pre><table style="border-spacing: 0"><tbody><tr><td class="gutter gl" style="text-align: right"><pre class="lineno">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19</pre></td><td class="code"><pre><span class="n">driver</span>:
  <span class="n">name</span>: <span class="n">vagrant</span>

<span class="n">provisioner</span>:
  <span class="n">name</span>: <span class="n">chef_zero</span>

<span class="n">platforms</span>:
  - <span class="n">name</span>: <span class="n">ubuntu</span>-<span class="m">12</span>.<span class="m">04</span>
  - <span class="n">name</span>: <span class="n">ubuntu</span>-<span class="m">14</span>.<span class="m">04</span>

<span class="n">suites</span>:
  - <span class="n">name</span>: <span class="n">development</span>
    <span class="n">run_list</span>:
      - <span class="n">recipe</span>[<span class="n">motd</span>::<span class="n">default</span>]
    <span class="n">attributes</span>:
  - <span class="n">name</span>: <span class="n">test</span>
    <span class="n">run_list</span>:
      - <span class="n">recipe</span>[<span class="n">motd</span>::<span class="n">default</span>]
    <span class="n">attributes</span>:<span class="w">
</span></pre></td></tr></tbody></table></pre></div></div></div></div>
<p>When you run <code>kitchen list</code>, you&#39;ll see the full test matrix.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">&times;</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/motd</h1>
            <div class="container"><div class="terminal"><table><tr><td class='gutter'><pre class='line-numbers'><span class='line-number'>$</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span><span class='line-number'>&nbsp;</span></pre></td><td class='code'><pre><code><span class='line command'>kitchen list</span><span class='line output'>Instance                  Driver   Provisioner  Verifier  Transport  Last Action</span><span class='line output'>development-ubuntu-12.04  Vagrant  ChefZero     Busser    Ssh        &lt;Not Created&gt;</span><span class='line output'>development-ubuntu-14.04  Vagrant  ChefZero     Busser    Ssh        &lt;Not Created&gt;</span><span class='line output'>test-ubuntu-12.04         Vagrant  ChefZero     Busser    Ssh        &lt;Not Created&gt;</span><span class='line output'>test-ubuntu-14.04         Vagrant  ChefZero     Busser    Ssh        &lt;Not Created&gt;</span></code></pre></td></tr></table></div></div>
          </div>
<p>Test matrices enable you to define multiple configurations, and test each configuration against one or more platforms.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Create the instance now by running `kitchen create`.

```bash
# ~/motd
$ kitchen create
-----> Starting Kitchen (v1.4.0)
-----> Creating <default-ubuntu-1404>...
       Bringing machine 'default' up with 'virtualbox' provider...
       ==> default: Importing base box 'opscode-ubuntu-14.04'...
[...]
       Vagrant instance <default-ubuntu-1404> created.
       Finished creating <default-ubuntu-1404> (1m37.94s).
-----> Kitchen is finished. (1m38.65s)
```

This command will take longer the first time your run it because Vagrant needs to download the base image, or box. After the base box is downloaded, `kitchen create` will complete much more quickly.

Now run `kitchen list` again.

```bash
# ~/motd
$ kitchen list
Instance             Driver   Provisioner  Verifier  Transport  Last Action
default-ubuntu-1404  Vagrant  ChefZero     Busser    Ssh        Created
```

The `Last Action` column now shows that the virtual machine has been created.
