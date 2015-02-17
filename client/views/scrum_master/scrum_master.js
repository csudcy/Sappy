function get_all_votes(users_obj) {
    var votes = [];
    for(var key in users_obj) {
        if (users_obj[key] !== 'C' && users_obj[key] !== '?') {
            votes.push(parseInt(users_obj[key], 10));
        }
    }
    return votes;
}

function get_percentage() {
    var users_obj = get_users(),
        completed = 0;
    for(var key in users_obj){
        if (users_obj[key] !== null){
            completed++;
        }
    }
    return completed * 100 / Object.keys(users_obj).length;
}

Template.scrum_master.helpers({
    room_users: function () {
        var users_obj = get_users();

        return Object.keys(users_obj).map(function(key) {
            return {
                'name': key,
                'vote': users_obj[key]
            };
        });
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
        var users_obj = get_users(),
            votes = get_all_votes(users_obj);
        return Fib.workout_average_fib_number(votes);
    },
    card_state: function(vote) {
        var users_obj = get_users();
        if (finished_vote(users_obj)) {
            // Voting is over; show the card
            var classes = 'card_front';

            // Highlight coffee or unknown
            if (vote === 'C' || vote === '?') {
                classes += ' highlight_non_vote';
            } else {
                // Highlight extreme
                var users_obj = get_users(),
                    votes = get_all_votes(users_obj),
                    avg_fib_vote = Fib.workout_average_fib_number(votes);
                if (Fib.is_extreme_vote(avg_fib_vote, vote)) {
                    classes += ' highlight_extreme_vote';
                }
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
    'click .reset_votes': function (event) {
        // Remove all votes but keep the users here
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
    'click .clear_room': function (event) {
        // Remove everyone from the room
        Rooms.update(
            {
                '_id': PersistentSession.get('room'),
            },
            {}
        );
    },
    'click .user_remove': function (event) {
        // Remove a specific user from the room
        var user_name = $(event.target).data('user_name');

        // Hacky mongo
        var unset = {};
        unset['users.' + user_name] =  null;

        //  Remove the user from the room
        Rooms.update(
            {
                '_id': PersistentSession.get('room'),
            },
            {
                $unset: unset
            }
        );
    },
    'click .show_qr': function(event) {
        $('.scrum_master_container, #footer').hide();
        $('#qr_container')
            .html('')
            .qrcode(window.location.href)
            .show();
    },
    'click #qr_container': function(event) {
        $('.scrum_master_container, #footer').show();
        $('#qr_container').hide();
    }
});
