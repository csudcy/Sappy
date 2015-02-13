
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

function get_all_votes(users_obj) {
    var votes = [];
    for(var key in users_obj) {
        if (users_obj[key] !== 'C' || users_obj[key] === '?') {
            votes.push(parseInt(users_obj[key], 10));
        }
    }
    return votes;
}

function get_fib_numbers() {
    return [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
}

function get_average_number(votes) {
    var sum = 0;
    for (var vote in votes) {
        sum += votes[vote];
    }
    return sum / votes.length;
}

function workout_average_fib_number(votes) {
    var average = Math.round(get_average_number(votes)),
        fibs = get_fib_numbers(),
        average_fib = 0;

    for (var i in fibs) {
        if (Math.abs(fibs[i] - average) < Math.abs(average_fib - average)) {
            average_fib = fibs[i];
        }
    }
    return average_fib;
}

function get_average_position(avg_fib, fibs) {
    var current_position = 0;

    for (var i in fibs) {
        if (fibs[i] === avg_fib) {
            return i;
        }
    }
}

function get_lower_bound(avg_fib_position, fibs) {
    if (avg_fib_position !== 0) {
        return fibs[avg_fib_position - 1];
    }
    return null;
}

function get_upper_bound(avg_fib_position, fibs) {
    if (avg_fib_position !== fibs.length - 1) {
        return fibs[avg_fib_position + 1];
    }
    return null;
}

function is_extreme_vote(users_obj, vote) {
    var votes = get_all_votes(users_obj),
        avg_fib = workout_average_fib_number(votes),
        fibs = get_fib_numbers(),
        // I don't know why but apparently this comes back as a string
        avg_fib_position = parseInt(get_average_position(avg_fib, fibs), 10),
        lower_bound = get_lower_bound(avg_fib_position, fibs),
        upper_bound = get_upper_bound(avg_fib_position, fibs);

    // if further than one fib number away of the average, it's considdered an extreme
    if (lower_bound && vote < lower_bound || upper_bound && vote > upper_bound) {
        return true;
    }

    return false;
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
            return workout_average_fib_number(votes);
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
            if (is_extreme_vote(get_users(), vote)) {
                classes += '  highlight_extreme_vote';
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
