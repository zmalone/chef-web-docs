## 5. Verify your node's configuration

Now let's log in to your node and run a few commands to help verify that the node is in the expected state. Specifically, we'll verify that the `web_admin` user is set up and that Apache is running and serves your home page.

First, log in to your node over SSH. If you're using a user name and password to authenticate, the command is similar to this.

TODO: Talk about both loggin in directly and WinRM remote...

```bash
# ~/chef-repo
$ ssh windows@52.10.205.36
```

If you're using key-based authentication, the command is similar to this.

```bash
# ~/chef-repo
$ ssh -i ~/.ssh/my.pem windows@52.10.205.36
```

[WINDOWS] Mac OS and most Linux distributions come with an SSH client. On Windows, [PuTTY](http://www.putty.org) is a popular SSH client for logging into Linux machines.

Now that we're logged in, we'll verify that:

* the user `web_admin` exists.
* `web_admin` owns the default home page.
* the `apache2` service is running.
* the home page is in the location we expect.
* the home page is being served and is accessible externally.

### Confirm that the default web site is installed and started

```ps
# C:\Windows\System32\inetsrv
$ appcmd.exe list sites
SITE "Default Web Site" (id:1,bindings:http/*:80:,state:Started)
```

### Verify that ASP.NET is installed

```ps
PS C:\Users\Administrator> Get-WindowsFeature -Name *ASP*

Display Name                                            Name                       Install State
------------                                            ----                       -------------
            [ ] ASP                                     Web-ASP                        Available
            [ ] ASP.NET 3.5                             Web-Asp-Net                    Available
            [X] ASP.NET 4.5                             Web-Asp-Net45                  Installed
    [X] ASP.NET 4.5                                     NET-Framework-45-ASPNET        Installed
```

### Verify that the web page is being served and is accessible externally

First close your SSH session.

```bash
# ~
$ exit
logout
Connection to 52.10.205.36 closed.
```

From your workstation, verify that your web site is accessible. Either navigate to your site from a web browser, or run one of the following commands:

**Mac OS and Linux:**

```ps
# ~
$ curl -I 52.10.205.36
HTTP/1.1 200 OK
Content-Length: 701
Content-Type: text/html
Last-Modified: Fri, 24 Apr 2015 20:40:47 GMT
Accept-Ranges: bytes
ETag: "be0c2f1ce7ed01:0"
Server: Microsoft-IIS/8.5
X-Powered-By: ASP.NET
Date: Fri, 24 Apr 2015 21:04:03 GMT
```

**Windows:**

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
                    Date: Fri, 24 Apr 2015 21:02:13 GMT
                    ETag: "be0c2f1ce7ed01:0"
                    Last-Modified: Fri, 24 Apr 2015 20:40:47 GMT
                    Server...
Forms             : {}
Headers           : {[Accept-Ranges, bytes], [Content-Length, 701], [Content-Type, text/html], [Date, Fri, 24 Apr 2015
                    21:02:13 GMT]...}
Images            : {@{innerHTML=; innerText=; outerHTML=<IMG alt=IIS src="iis-85.png" width=960 height=600>;
                    outerText=; tagName=IMG; alt=IIS; src=iis-85.png; width=960; height=600}}
InputFields       : {}
Links             : {@{innerHTML=<IMG alt=IIS src="iis-85.png" width=960 height=600>; innerText=; outerHTML=<A
                    href="http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409"><IMG alt=IIS src="iis-85.png"
                    width=960 height=600></A>; outerText=; tagName=A;
                    href=http://go.microsoft.com/fwlink/?linkid=66138&amp;clcid=0x409}}
ParsedHtml        : System.__ComObject
RawContentLength  : 701
```
