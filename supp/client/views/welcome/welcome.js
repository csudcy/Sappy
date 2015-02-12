Template.welcome.events({
    'click .scrum_master': function () {
        show_template(Template.scrum_master);
    },
    'click .resource': function () {
        show_template(Template.resource);
    }
});
