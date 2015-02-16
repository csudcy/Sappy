Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.methods({
    'join_room': function(user_type, room, user) {
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
        }
    }
});
