
function join(user_type, room, user) {
    // Save details to the persistent session
    PersistentSession.set('room', room);
    if (user_type === 'resource') {
        PersistentSession.set('user', user);
    }

    // Make sure the room exists
    Rooms.upsert(
        // Selector
        {
            _id: room
        },
        // Modifier
        {
            // If we've inserted the room, make sure it has a users object
            $setOnInsert: {
                users: {}
            }
        }
    );

    // Decide what to do
    if (user_type === 'resource') {
        // Make sure the user exists in the room
        var set = {};
        set['users.'+user] = null;
        Rooms.update(
            // Selector
            {
                _id: room
            },
            // Modifier
            {
                $set: set
            }
        );

        // Show the next template
        show_template(Template.resource);
    } else {
        // Show the next template
        show_template(Template.scrum_master);
    }
}

Template.welcome.helpers({
    user_type: function (check_user_type) {
        if (check_user_type !== undefined) {
            return PersistentSession.get('user_type') === check_user_type;
        }
        return PersistentSession.get('user_type');
    },
    rooms: function() {
        return Rooms.find();
    },
    room_selected: function(room) {
        // This is a very hacky helper because Meteor can't cope with reactive variables being used in an if statement
        if (PersistentSession.get('room') == room) {
            return 'selected';
        }
        return '';
    },
    init_select2: function() {
        // Hacky helper to make sure selects are always select2-ised
        Meteor.defer(function () {
            $('select[name=room]').select2({
                placeholder: 'What room?',
                allowClear: true
            });
        });
    }
});

Template.welcome.events({
    'click .user_type': function (e) {
        PersistentSession.set('user_type', $(e.target).data('user_type'));
    },
    'click .room_clear': function (e) {
        var count = 0;
        Rooms.find().forEach(function(room) {
            count += Rooms.remove({_id: room._id});
        });
        alert('Removed '+count+' room(s)!');
    },
    'click .go': function () {
        var user_type = PersistentSession.get('user_type'),
            room = $('.welcome_container [name=room]').val(),
            user = $('.welcome_container [name=user]').val();

        join(user_type, room, user);
    }
});
