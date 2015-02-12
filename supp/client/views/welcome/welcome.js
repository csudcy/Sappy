
Template.welcome.helpers({
    user_type: function (check_user_type) {
        if (check_user_type !== undefined) {
            return Session.get('user_type') === check_user_type;
        }
        return Session.get('user_type');
    }
});

Template.welcome.events({
    'click .user_type': function (e) {
        Session.set('user_type', $(e.target).data('user_type'));
    },
    'click .go': function () {
        if (Session.get('user_type') === 'resource') {
            show_template(Template.resource);
        } else {
            show_template(Template.scrum_master);
        }
    }
});
