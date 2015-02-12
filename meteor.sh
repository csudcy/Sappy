#!/bin/bash

# Make sure everything is up to date
sudo apt-get update

# Install meteor
if [ ! `command -v meteor 2>/dev/null` ]; then
    sudo apt-get install -y curl
    curl https://install.meteor.com | sudo sh
fi

# Mount a directory which can lock files for mongod
if [ ! -d /home/vagrant/.meteor/local ]; then
    mkdir -p /home/vagrant/.meteor/local
fi
sudo mount --bind /home/vagrant/.meteor/local/ /vagrant/.meteor/local/

# Run the app
cd /vagrant
meteor
