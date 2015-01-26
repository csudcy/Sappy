# Sappy
"Super awesome planning poker, yeah!" is a [Meteor](https://www.meteor.com/) based web app to make planning poker games easier.


##Running Sappy

###Windows

Cobbled together from  https://gist.github.com/gabrielhpugliese/5855677 & other internet sources:

1. Install [VirtualBox](https://www.virtualbox.org/)
1. Install [vagrant](https://www.vagrantup.com/)
1. Run
```
set PATH=%PATH%;C:\Program Files\Oracle\VirtualBox;C:\Program Files (x86)\Git\bin
vagrant up
```
1. Hit http://localhost:3000 & enjoy Sappy!


###Linux

You can probably just run `./meteor.sh` though it does some symlinking you probably don't need and your directories will be different.


###Heroku

I havent tried yet but https://github.com/jordansissel/heroku-buildpack-meteor looks like the way to go.
