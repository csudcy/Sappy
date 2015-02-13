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
* Highlight outliers
* Give estimates titles/Jira links
* Remove individual users from a room

Private UI:
* Make it look better on phones!
* Don't allow card change after vote is ended?
* Drop back to welcome screen when removed from a room

Stretch goals:
* Greasemonkey script to add "Vote now" link in Jira?
* Integrate with Jira - list tickets that need to be estimated?
* Keep a history of votes - needs to be identifiable; Jira link?
* Cheat sheet from vote history
* App to make it easier to use on phones
* Customisable cards
