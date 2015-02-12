function get_users() {
    return Rooms.findOne({
        _id: PersistentSession.get('room')
    }).users;
}

Template.scrum_master.helpers({
    room_users: function () {
        var users = get_users();
        console.log(users);
        return JSON.stringify(users);
    },
    room_name: function () {
        return PersistentSession.get('room');
    }
});

Template.scrum_master.events({
    'click .reset_votes': function () {
        // insert a click record when the button is clicked
        var set = {};
        console.log("Reset!");
        Object.keys(get_users()).forEach(function(u){
            set['users.' + u] =  null;
        });

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
