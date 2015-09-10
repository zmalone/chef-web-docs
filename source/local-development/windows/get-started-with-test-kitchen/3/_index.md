## 3. Create the Test Kitchen instance

Now you'll provision a virtual machine to serve as your test environment. This is the `kitchen create` step in our workflow.

<img src="/assets/images/misc/local_dev_workflow1.png" style="box-shadow: none;" alt=""/>

We often call the set of virtual environments that's created by Test Kitchen simply a _kitchen_. Run `kitchen list` to see what's in the kitchen.

```bash
# ~/settings
$ kitchen list
Instance                Driver  Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Ec2     ChefZeroScheduledTask  Busser    Winrm      <Not Created>
```

If you're using a driver other than the EC2 driver, you would see that driver listed in the **Driver** column.

Our kitchen includes just one instance &ndash; a Windows Server 2012 R2 virtual machine that's configured to run the `default` suite. The `Last Action` column shows that the virtual machine was not yet created.

<a class="help-button radius" href="#" data-reveal-id="test-matrix-modal">Learn more about test matrices</a>

<div id="test-matrix-modal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
<p>Remember, you can target more than one platform, and also define more than one suite. Test Kitchen multiplies the number of platforms by the number of suites, creating a <em>matrix</em> of test scenarios. For example, imagine that you have two suites &ndash; one named <code>development</code> and one <code>test</code>. You also have two platforms that you want to test against &ndash; a standard Windows Server 2012 R2 configuration named <code>windows-2012r2</code> and a version that contains added security settings named <code>windows-2012r2-secure</code>. You want to ensure that your cookbook works as you expect on both platforms. Your <code class="file-path">.kitchen.yml</code> file might look like this.</p>
<div class="window " ng-non-bindable="">
              <nav class="control-window">
                <div class="close">×</div>
                <div class="minimize"></div>
                <div class="deactivate"></div>
              </nav>
              <h1 class="titleInside">Editor: ~/settings</h1>
              <div class="container"><div class="editor"><div class="highlight ruby"><pre class="code_wrapper"><table style="border-spacing: 0"><tbody><tr><td class="gutter gl" style="text-align: right"><pre class="lineno">1
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
19
20</pre></td><td class="code"><pre><span class="o">---</span>
<span class="ss">driver:
  </span><span class="nb">name</span><span class="p">:</span> <span class="n">vagrant</span>

<span class="ss">provisioner:
  </span><span class="nb">name</span><span class="p">:</span> <span class="n">chef_zero_scheduled_task</span>

<span class="ss">platforms:
  </span><span class="o">-</span> <span class="nb">name</span><span class="p">:</span> <span class="n">windows</span><span class="o">-</span><span class="mi">2012</span><span class="n">r2</span>
  <span class="o">-</span> <span class="nb">name</span><span class="p">:</span> <span class="n">windows</span><span class="o">-</span><span class="mi">2012</span><span class="n">r2</span><span class="o">-</span><span class="n">secure</span>

<span class="ss">suites:
  </span><span class="o">-</span> <span class="nb">name</span><span class="p">:</span> <span class="n">development</span>
    <span class="ss">run_list:
      </span><span class="o">-</span> <span class="n">recipe</span><span class="o">[</span><span class="n">settings</span><span class="o">::</span><span class="n">default</span><span class="o">]</span>
    <span class="ss">attributes:
  </span><span class="o">-</span> <span class="nb">name</span><span class="p">:</span> <span class="nb">test</span>
    <span class="ss">run_list:
      </span><span class="o">-</span> <span class="n">recipe</span><span class="o">[</span><span class="n">settings</span><span class="o">::</span><span class="n">default</span><span class="o">]</span>
    <span class="n">attributes</span><span class="p">:</span><span class="w">
</span></pre></td></tr></tbody></table></pre></div></div></div></div>
<p>When you run <code>kitchen list</code>, you&#39;ll see the full test matrix.</p>
<div class="window ">
            <nav class="control-window">
              <div class="close">×</div>
              <div class="minimize"></div>
              <div class="deactivate"></div>
            </nav>
            <h1 class="titleInside">Terminal: ~/settings</h1>
            <div class="container"><div class="terminal"><table><tbody><tr><td class="gutter"><pre class="line-numbers"><span class="line-number">$</span><span class="line-number">&nbsp;</span><span class="line-number">&nbsp;</span><span class="line-number">&nbsp;</span><span class="line-number">&nbsp;</span><span class="line-number">&nbsp;</span></pre></td><td class="code"><pre><code><span class="line command">kitchen list</span><span class="line output">Instance                           Driver   Provisioner            Verifier  Transport  Last Action</span><span class="line output">development-windows-2012r2         Vagrant  ChefZeroScheduledTask  Busser    Winrm      &lt;Not Created&gt;</span><span class="line output">development-windows-2012r2-secure  Vagrant  ChefZeroScheduledTask  Busser    Winrm      &lt;Not Created&gt;</span><span class="line output">test-windows-2012r2                Vagrant  ChefZeroScheduledTask  Busser    Winrm      &lt;Not Created&gt;</span><span class="line output">test-windows-2012r2-secure         Vagrant  ChefZeroScheduledTask  Busser    Winrm      &lt;Not Created&gt;</span></code></pre></td></tr></tbody></table></div></div>
          </div>
<p>This feature enables you to define multiple configurations, and test each configuration against one or more platforms.</p>
  <a class="close-reveal-modal" aria-label="Close">&#215;</a>
</div>

Create the instance now by running `kitchen create`.

```bash
# ~/settings
$ kitchen create
-----> Starting Kitchen (v1.4.2)
-----> Creating <default-windows-2012r2>...
       If you are not using an account that qualifies under the AWS
free-tier, you may be charged to run these suites. The charge
should be minimal, but neither Test Kitchen nor its maintainers
are responsible for your incurred costs.

       Instance <i-c5f28e00> requested.
       EC2 instance <i-c5f28e00> created.
       Waited 0/600s for instance <i-c5f28e00> to become ready.
[...]
       Waited 340/600s for instance <i-c5f28e00> to become ready.
       Waited 0/600s for instance <i-c5f28e00> to fetch windows admin password.
       Retrieved Windows password for instance <i-c5f28e00>.
       EC2 instance <i-c5f28e00> ready.
       [WinRM] Established


           Directory: C:\chef\ohai\hints


       Mode                LastWriteTime     Length Name
       ----                -------------     ------ ----
       -a---         8/31/2015   4:33 PM          0 ec2.json


       Finished creating <default-windows-2012r2> (6m45.10s).
-----> Kitchen is finished. (6m46.15s)
```

This output is for the EC2 driver. The output that you'll see depends on which driver you're using.

Now run `kitchen list` again.

```bash
# ~/settings
$ kitchen list
Instance                Driver  Provisioner            Verifier  Transport  Last Action
default-windows-2012r2  Ec2     ChefZeroScheduledTask  Busser    Winrm      Created
```

The `Last Action` column now shows that the virtual machine has been created.
