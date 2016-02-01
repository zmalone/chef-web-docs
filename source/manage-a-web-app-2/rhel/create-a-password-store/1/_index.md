## 1. Generate a key to encrypt data bag items

Encrypting a data bag item requires a secret key. A common way to generate this key is to create a large random number and write it to a text file.

Run the command that matches your workstation setup.

### From a Linux or Mac OS workstation

```bash
# ~/learn-chef
$ openssl rand -base64 512 | tr -d '\r\n' > /tmp/encrypted_data_bag_secret
```

### From a Windows workstation

```ps
# ~\chef-repo
$ $key = New-Object byte[](512)
$ $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($key)
$ [Convert]::ToBase64String($key) | Out-File "C:\temp\encrypted_data_bag_secret" -encoding "UTF8"
$ [array]::Clear($key, 0, $key.Length)
```

<p style="font-size: 14px; font-style: italic;">
This example was adapted from <a href="http://powershell.org/wp/2014/02/01/revisited-powershell-and-encryption/">PowerShell.org</a>.
</p>
