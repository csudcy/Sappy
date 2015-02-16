// This is a global function
show_template = function(template) {
    var content = $('.content');
    content.html('');
    UI.render(template, content.get(0));
};

// This is a global variable
PersistentSession = new PersistentSessionClass();

get_room = function() {
    return Rooms.findOne({
        _id: PersistentSession.get('room')
    });
};

get_users = function() {
    return get_room().users;
};

finished_vote = function(users_obj) {
    if (users_obj) {
        var total_people = Object.keys(users_obj).length;
        for(var key in users_obj) {
            if (users_obj[key] !== null) {
                total_people--;
            }
        }
        return total_people === 0;
    }
};

get_all_votes = function(users_obj) {
    var votes = [];
    for(var key in users_obj) {
        if (users_obj[key] !== 'C' && users_obj[key] !== '?') {
            votes.push(parseInt(users_obj[key], 10));
        }
    }
    return votes;
};
