function get_users() {
    return Rooms.findOne({
        _id: PersistentSession.get('room')
    }).users;
}

function get_percentage() {
    var users_obj = get_users();
    var not_completed = 0;
    for(var key in users_obj){
        if (users_obj[key] === null){
            not_completed++;
        }
    }
    var result = (Object.keys(users_obj).length - not_completed) * 100 / Object.keys(users_obj).length;
    console.log(result);
    return result
}

Template.scrum_master.helpers({
    room_users: function () {
        var users_ar = [];
        var users_obj = get_users();

        for(var key in users_obj){
            users_ar.push({
                'name': key,
                'vote': users_obj[key]
            });
        }

        return users_ar;
    },
    room_name: function () {
        return PersistentSession.get('room');
    },
    voting_done: function () {
        return get_percentage() == 100;
    },
    status_percentage: function () {
        return get_percentage();
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
    },
    'click .clear_room': function () {
        Rooms.update(
            {
                '_id': PersistentSession.get('room'),
            },
            {}
        );
    }
});
