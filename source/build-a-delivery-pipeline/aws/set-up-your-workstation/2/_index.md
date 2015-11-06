## 2. Update your Delivery user with an SSH public key

You need to associate your public SSH key with your Delivery user name.

Start by generating an SSH key. You can skip this step if you already have one, for example, a file named <code class="file-path">~/.ssh/id_rsa.pub</code>.

```bash
# ~
$ ssh-keygen -t rsa -b 4096 -C "you@example.com"
```

The output is similar to:

```bash
# ~
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/username/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/path/to/.ssh/id_rsa.
Your public key has been saved in /Users/path/to/.ssh/id_rsa.pub.
The key fingerprint is:
ac:8a:57:90:58:c1:cd:34:32:18:9d:f3:79:60:f3:41 you@example.com
The key's randomart image is:
+--[ RSA 4096]----+
|  .==*o.E        |
|  . *o*..        |
|   o + = .       |
|  . o o.o        |
|     . ..S       |
|      ..         |
|     ..          |
|   .*o*.         |
|  ...            |
+-----------------+
```

Now print your SSH key to the console, like this.

```bash
# ~
$ cat ~/.ssh/id_rsa.pub
```

The output is similar to:

```bash
# ~
ssh-rsa
AAAAB3NzaC1yc2EAAAADAQABAAACAQDa8BR/9bj5lVUfQP9Rsqon5qJMkiVm+JAtGi
wnhxqgyRhkYLIzm6+gcifDgMOMuwZA88Ib5WNRhxjlmTseapower4rH/jAAczdp1h1
7xLEEbUfQfkcqiy/Drp3k12345678ad234fgvdsasdfasdfR9ddNIeNvQ7OIpOCfLE
PCyFz3aRRuhpM/5cySFT7bl1O44bNgfiuqRzcXFscZb03WPlhaPwCvL2uxaRzdrAGQ
mE5jzCo6nORvKoGdVDa2++def33f3xPZCo3oJ08Q9XJ2CnfJlmyNe1hwI2NOQ3yRbc
nfSMona7ccSyHRWGs5bS//u6P0NK5AqH5jK8pg3XwtHZqLwUVy1wX0WnnJWg9IWXf3
2g3P4O4NJGVUeX33Czv32GK8YphuEweqFu/Ej7kQp1ppIxkEtrpBfMi3na0QqZlk6w
wghZLa++DUfWOhGsuuBgnsocAR5rLGy+gkypdie1Ydoe8qjLVZR/jKybQfQjuZOS30
fZnwJhl2ZaeraPfkEXlVhK02/8PIALGfeXdt9KvQN0p5c6lRoDxqBqslM+1KbKKcGd
lSGEsAIP9OOWBECRxlOwqlqGHtrgWKOr376dntMIy2+fFD/74tJMjRwbRzm8IGWmj6
OcF6EvTYYO4RmISD8G+6dm1m4MlxLS53aZQWgYWvRdfNB1DA
Zo3h9Q== you@example.com
```

Log into the Chef Delivery server using the URL from the previous lesson. From the login page, enter your Chef Delivery user name and password.

Open your user profile and paste the output from your terminal window into the text area lableled **Public SSH**. If you were assigned a default password, change it and save your profile.
