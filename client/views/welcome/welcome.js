Meteor.startup(function () {
    // Ensure we always have a user_type
    if (PersistentSession.get('user_type') === undefined) {
        PersistentSession.set('user_type', 'resource');
    }
});

Template.welcome.helpers({
    user_type: function (check_user_type) {
        if (check_user_type !== undefined) {
            return PersistentSession.get('user_type') === check_user_type;
        }
        return PersistentSession.get('user_type');
    },
    has_rooms: function() {
        return Rooms.find().count() > 0;
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

        // Validate
        $('.has-error').removeClass('has-error');
        var error = false;
        if (room === undefined || room === null) {
            error = true;
        }
        if (user_type == 'resource') {
            if (user === undefined || user === null || user === '') {
                error = true;
            }
        }

        if (error) {
            alert('You must fill in the form!');
        } else {
            // Save details to the persistent session
            PersistentSession.set('room', room);
            if (user_type === 'resource') {
                PersistentSession.set('user', user);
            }

            // Join the room on the server
            Meteor.call('join_room', user_type, room, user);

            // Show the next template
            if (user_type === 'resource') {
                show_template(Template.resource);
            } else {
                show_template(Template.scrum_master);
            }
        }
    }
});
