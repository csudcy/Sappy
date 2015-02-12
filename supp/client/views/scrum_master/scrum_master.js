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
    return result;
}

function finished_vote(users_obj) {
    if (users_obj) {
        var total_people = Object.keys(users_obj).length;
        for(var key in users_obj) {
            if (users_obj[key] !== null) {
                total_people--;
            }
        }
        return total_people === 0;
    }
}

function get_all_votes(users_obj) {
    var votes = [];
    for(var key in users_obj) {
        if (users_obj[key] === 'C') {
            console.log('some chose a coffe break');
        } else if (users_obj[key] === '?') {
            console.log('uncertain');
        } else {
            votes.push(parseInt(users_obj[key], 10));
        }
    }
    return votes;
}

function get_average_number(votes) {
    var sum = 0;
    for (var vote in votes) {
        console.log(votes[vote]);
        sum += votes[vote];
    }
    return sum / votes.length;
}

function workout_average_fib_number(votes) {
    var average = Math.round(get_average_number(votes)),
        fibs = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100],
        average_fib = 0;

    for (var i in fibs) {
        if (Math.abs(fibs[i] - average) < Math.abs(average_fib - average)) {
            average_fib = fibs[i];
        }
    }
    return average_fib;
}

Template.scrum_master.helpers({
    room_users: function () {
        console.log('checked');
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
    },
    average: function() {
        users_obj = get_users();
        if (finished_vote(users_obj)) {
            console.log('Finished voting');
            // get all votes
            var votes = get_all_votes(users_obj);
            // get the average & display
            return workout_average_fib_number(votes);
        }
        return 10000000;
    },
    card_state: function(vote) {
        if (get_percentage() == 100) {
            // Voting is over; show the card
            return 'card_front';
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
