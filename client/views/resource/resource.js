function current_vote() {
    var users_obj = get_users();
    return users_obj[PersistentSession.get('user')]
}

Template.resource.helpers({
    room_name: function () {
        return PersistentSession.get('room');
    },
    user_name: function () {
        return PersistentSession.get('user');
    },
    numbers: function () {
        return [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', 'C'];
    },
    is_selected: function(val) {
        return (current_vote() === String(val));
    }
});

Template.resource.events({
    'click .card_container': function (event, template) {
        // Check we can still vote
        var users_obj = get_users();
        if (finished_vote(users_obj)) {
            alert('Voting is closed!');
            return;
        }

        // work out which user to set the value for
        var set = {};
        set['users.' + PersistentSession.get('user')] =  $(event.target).val();

        //  update the user's value in the room
        Rooms.update(
            {
                '_id': PersistentSession.get('room'),
            },
            {
                $set: set
            }
        );
    }
});
