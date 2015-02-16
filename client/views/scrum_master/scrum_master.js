
function get_percentage() {
    var users_obj = get_users();
    var not_completed = 0;
    for(var key in users_obj){
        if (users_obj[key] === null){
            not_completed++;
        }
    }
    var result = (Object.keys(users_obj).length - not_completed) * 100 / Object.keys(users_obj).length;
    return result;
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
        var users_obj = get_users();
        return finished_vote(users_obj);
    },
    status_percentage: function () {
        return get_percentage();
    },
    average: function() {
        var users_obj = get_users();
        if (finished_vote(users_obj)) {
            // get all votes
            var votes = get_all_votes(users_obj);
            // get the average & display
            return Fib.workout_average_fib_number(votes);
        }
    },
    card_state: function(vote) {
        var users_obj = get_users();
        if (finished_vote(users_obj)) {
            // Voting is over; show the card
            var classes = 'card_front';

            // highlight coffee or unknown
            if (vote === 'C' || vote === '?') {
                classes += ' highlight_non_vote';
            }

            // highlight extreme
            if (Fib.is_extreme_vote(get_users(), vote)) {
                classes += ' highlight_extreme_vote';
            }
            return classes;
        }

        if (vote) {
            // This player has voted
            return 'card_back';
        }

        // Waiting for a vote
        return 'card_empty';
    }
});

Template.scrum_master.events({
    'click .reset_votes': function () {
        // insert a click record when the button is clicked
        var set = {};
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
