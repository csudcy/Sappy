Supp
====
"Super useful planning poker!" is a [Meteor](https://www.meteor.com/) based web app to make planning poker games easier.

[toc]


##Running Supp


###Windows

See [Vagrant](VAGRANT.md) or [Docker](DOCKER.md) instructions.

###Linux

You can probably just run `./meteor.sh` though it does some symlinking you probably don't need and your directories will be different.


###Heroku

I havent tried yet but https://github.com/jordansissel/heroku-buildpack-meteor looks like the way to go.


###Todo

Public UI:
* Countdown before showing numbers?
* Force end before everyone has voted
* Give estimates titles/Jira links

Private UI:
* Dont remove users vote on room join
* Drop back to welcome screen when removed from a room

Stretch goals:
* Keep a history of votes - needs to be identifiable; Jira link?
* Greasemonkey script to add "Vote now" link in Jira?
* Integrate with Jira - list tickets that need to be estimated?
* Cheat sheet from vote history
* Customisable cards
