Template.welcome.events({
    'click .lead': function () {
        show_template(Template.leader_vote_before);
    },
    'click .participate': function () {
        show_template(Template.participant_vote_before);
    }
});
