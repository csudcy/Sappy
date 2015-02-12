
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
        var user_type = Session.get('user_type'),
            room = $('.welcome_container [name=room]').val(),
            name = $('.welcome_container [name=name]').val();
        if (user_type === 'resource') {
            console.log('Resource "'+name+'" joining "'+room+'"!')
            show_template(Template.resource);
        } else {
            console.log('Master joining "'+room+'"!')
            show_template(Template.scrum_master);
        }
    }
});
