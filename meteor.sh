#!/bin/bash

# Make sure everything is up to date
sudo apt-get update

# Install meteor
if [ ! `command -v meteor 2>/dev/null` ]; then
    sudo apt-get install -y curl
    curl https://install.meteor.com | sudo sh
fi

# If the real app doesnt exist, create it
if [ ! -d /vagrant/sappy ]; then
    meteor create /vagrant/sappy
    mkdir -p /vagrant/sappy/.meteor/local
fi

# Mount a directory which can lock files for mongod
if [ ! -d /home/vagrant/sappy/.meteor/local ]; then
    mkdir -p /home/vagrant/sappy/.meteor/local
fi
sudo mount --bind /home/vagrant/sappy/.meteor/local/ /vagrant/sappy/.meteor/local/

# Run the app
cd /vagrant/sappy
meteor
