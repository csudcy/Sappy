Supp
====
"Super useful planning poker!" is a [Meteor](https://www.meteor.com/) based web app to make planning poker games easier.


##Running Supp


###Windows

See [Vagrant](VAGRANT.md) or [Docker](DOCKER.md) instructions.

###Linux

You can probably just run `./meteor.sh` though it does some symlinking you probably don't need and your directories will be different.


###Heroku

https://github.com/AdmitHub/meteor-buildpack-horse seems to work well so far.


###Todo

Public UI:
* Add a QR code for the public URL
* Add firworks/fanfares when everyone agrees!
* Countdown before showing numbers?
* Force end before everyone has voted

Private UI:
* Dont remove user vote on room join
* Drop back to welcome screen when removed from a room

Stretch goals:
* Keep a history of votes
* Votes need to be identifiable; Jira link/title?
* Cheat sheet from vote history
* Greasemonkey script to add "Vote now" link in Jira?
* Integrate with Jira - list tickets that need to be estimated?
* Customisable cards
