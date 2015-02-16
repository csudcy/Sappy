// This is a global function
show_template = function(template) {
    var content = $('.content');
    content.html('');
    UI.render(template, content.get(0));
};

// This is a global variable
PersistentSession = new PersistentSessionClass();

get_users = function() {
    return Rooms.findOne({
        _id: PersistentSession.get('room')
    }).users;
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
