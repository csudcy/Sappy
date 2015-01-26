Sappy
=====
"Super awesome planning poker, yeah!" is a [Meteor](https://www.meteor.com/) based web app to make planning poker games easier.

[toc]


##Running Sappy


###Windows

Cobbled together from  https://gist.github.com/gabrielhpugliese/5855677 & other internet sources:

1. Install [VirtualBox](https://www.virtualbox.org/)
1. Install [vagrant](https://www.vagrantup.com/)
1. Run this:

 ```
set PATH=%PATH%;C:\Program Files\Oracle\VirtualBox;C:\Program Files (x86)\Git\bin
vagrant up --provision
```
 Note: the `--provision` [argument ](https://docs.vagrantup.com/v2/cli/up.html) ensures the `meteor.sh` is run at startup so the Meteor server is automatically started
1. Hit http://localhost:3000 & enjoy Sappy!


###Linux

You can probably just run `./meteor.sh` though it does some symlinking you probably don't need and your directories will be different.


###Heroku

I havent tried yet but https://github.com/jordansissel/heroku-buildpack-meteor looks like the way to go.
