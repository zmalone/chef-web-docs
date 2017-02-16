#!/bin/bash

apt-get update
apt-get -y install curl

# Ensure the time is up to date
apt-get -y install ntp
service ntp stop
ntpdate -s time.nist.gov
service ntp start

# Install Chef Automate
if [ ! $(which automate-ctl) ]
  then
    # Download the package
    if [ ! -d ~/downloads ]
      then
        mkdir ~/downloads
    fi
    wget -P ~/downloads https://packages.chef.io/files/stable/delivery/0.6.136/ubuntu/14.04/delivery_0.6.136-1_amd64.deb

    # Install the package
    dpkg -i ~/downloads/delivery_0.6.136-1_amd64.deb

    # Run preflight check
    automate-ctl preflight-check
fi
