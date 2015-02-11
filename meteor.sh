#!/bin/bash

# Make sure everything is up to date
sudo apt-get update

# Install meteor
if [ ! `command -v meteor 2>/dev/null` ]; then
    sudo apt-get install -y curl
    curl https://install.meteor.com | sudo sh
fi

# If the real app doesnt exist, create it
if [ ! -d /vagrant/supp ]; then
    meteor create /vagrant/supp
    mkdir -p /vagrant/supp/.meteor/local
fi

# Mount a directory which can lock files for mongod
if [ ! -d /home/vagrant/supp/.meteor/local ]; then
    mkdir -p /home/vagrant/supp/.meteor/local
fi
sudo mount --bind /home/vagrant/supp/.meteor/local/ /vagrant/supp/.meteor/local/

# Run the app
cd /vagrant/supp
meteor
