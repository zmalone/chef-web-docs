## 5. Verify your node's configuration

Now let's connect to your node and run a few commands to help verify that the node is in the expected state. Specifically, we'll verify that IIS, ASP.NET, and the IIS Management Console are configured and that your node serves the default home page.

First, connect to your node. You can connect directly if you have physical access to the server, or create a Remote Desktop connection if your node exists remotely.

Now that we're logged in, we'll verify that:

* IIS and ASP.NET are installed.
* you can access the IIS Management Console.
* the default web site is installed and started.
* you can access the default web site externally.

## Verify that IIS and ASP.NET are installed

From your Windows Server 2012 R2 node, run the following command to verify that IIS is installed.

```ps
# ~
$ Get-WindowsFeature -Name Web-Server

Display Name                                            Name                       Install State
------------                                            ----                       -------------
[X] Web Server (IIS)                                    Web-Server                     Installed
```

Now run this command to verify that ASP.NET is installed.

```ps
# ~
$ Get-WindowsFeature -Name Web-Asp-Net45

Display Name                                            Name                       Install State
------------                                            ----                       -------------
            [X] ASP.NET 4.5                             Web-Asp-Net45                  Installed
```

## Verify that you can access the IIS Management Console

From the **Run** box or the **Start** screen on your Windows Server 2012 R2 node, run **inetmgr**.

![the IIS Management Console](/assets/images/misc/iis_manager_start.png)

## Verify that the default web site is installed and started

From the IIS Management Console, select **Sites** from the **Connections** pane. You'll see the default web site from the **Sites** pane.

![the default site through the IIS Management Console](/assets/images/misc/iis_manager_default_site.png)

You can also verify this from the command line. Run the [Get-WebSite](https://technet.microsoft.com/en-us/library/ee790588.aspx) cmdlet to list the available sites.

```ps
# ~
$ Get-Website

Name             ID   State      Physical Path                  Bindings
----             --   -----      -------------                  --------
Default Web Site 1    Started    %SystemDrive%\inetpub\wwwroot  http *:80:
```

## Verify that you can access the default web site externally

Now let's verify that you can access the site from your workstation.

If you navigate to your site from a web browser, you'll see this.

![the default home page through a browser](/assets/images/misc/iis_default_home_page.png)

Alternatively, you can confirm the connection from the command line. On a Windows workstation, you would run:

```ps
# ~
$ Invoke-WebRequest 52.10.205.36

StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
                    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                    <meta http-equiv="Content-Type" cont...
RawContent        : HTTP/1.1 200 OK
                    Accept-Ranges: bytes
                    Content-Length: 701
                    Content-Type: text/html
                    Date: Tue, 18 Aug 2015 15:19:44 GMT
                    ETag: "e56e8f49c3d9d01:0"
                    Last-Modified: Tue, 18 Aug 2015 14:36:36 GMT
                    Serve...
Forms             : {}
Headers           : {[Accept-Ranges, bytes], [Content-Length, 701], [Content-Type, text/html], [Date, Tue, 18 Aug 2015
                    15:19:44 GMT]...}
Images            : {@{innerHTML=; innerText=; outerHTML=<IMG alt=IIS src="iis-85.png" width=960 height=600>;
                    outerText=; tagName=IMG; alt=IIS; src=iis-85.png; width=960; height=600}}
InputFields       : {}
Links             : {@{innerHTML=<IMG alt=IIS src="iis-85.png" width=960 height=600>; innerText=; outerHTML=<A
                    href="http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409"><IMG alt=IIS src="iis-85.png"
                    width=960 height=600></A>; outerText=; tagName=A;
                    href=http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409}}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 701
```

On Linux or Mac OS, you would run:

```bash
# ~
$ curl -I 52.26.226.15
HTTP/1.1 200 OK
Content-Length: 701
Content-Type: text/html
Last-Modified: Tue, 18 Aug 2015 14:36:36 GMT
Accept-Ranges: bytes
ETag: "e56e8f49c3d9d01:0"
Server: Microsoft-IIS/8.5
X-Powered-By: ASP.NET
Date: Tue, 18 Aug 2015 15:17:39 GMT
```
