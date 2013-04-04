##### Verify the changes
1. Let's verify the changes actually happened on the node. SSH into the Virtual Machine again:

        $ vagrant ssh

1. Verify the `sites` alias:

        vagrant@vagrant:~$ sites
        vagrant@vagrant:/etc/apache2/sites-enabled$ pwd
        /etc/apache2/sites-enabled

1. Go home with our `h` alias:

        vagrant@vagrant:/etc/apache2/sites-enabled$ h
        vagrant@vagrant:~$ pwd
        /home/vagrant

1. Finally, make sure our `EDITOR` is vim:

        vagrant@vagrant:~$ echo $EDITOR
        vim

1. Make sure apache is running!

        vagrant@vagrant:~$ ps aux | grep apache
        root      3156  0.0  0.8  69944  2996 ?        Ss   21:14   0:00 /usr/sbin/apache2 -k start
        www-data  3159  0.0  0.5  69676  2040 ?        S    21:14   0:00 /usr/sbin/apache2 -k start
        www-data  3161  0.0  0.7 678560  2832 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
        www-data  3162  0.0  0.8 744160  3340 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
        www-data  3163  0.0  0.7 678560  2832 ?        Sl   21:14   0:00 /usr/sbin/apache2 -k start
        vagrant   6477  0.0  0.2   9384   928 pts/0    S+   21:43   0:00 grep --color=auto apache
