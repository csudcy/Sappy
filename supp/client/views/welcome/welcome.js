
Template.welcome.helpers({
    user_type: function (check_user_type) {
        if (check_user_type !== undefined) {
            return PersistentSession.get('user_type') === check_user_type;
        }
        return PersistentSession.get('user_type');
    }
});

Template.welcome.events({
    'click .user_type': function (e) {
        PersistentSession.set('user_type', $(e.target).data('user_type'));
    },
    'click .go': function () {
        var user_type = PersistentSession.get('user_type'),
            room = $('.welcome_container [name=room]').val(),
            name = $('.welcome_container [name=name]').val();

        // Save details to the persistent session
        PersistentSession.set('room', room);
        PersistentSession.set('name', name);

        // Decide what to do
        if (user_type === 'resource') {
            // Do some db stuff
            console.log('Resource "'+name+'" joining "'+room+'"!')

            // Show the next template
            show_template(Template.resource);
        } else {
            // Do some db stuff
            console.log('Master joining "'+room+'"!')

            // Show the next template
            show_template(Template.scrum_master);
        }
    }
});
