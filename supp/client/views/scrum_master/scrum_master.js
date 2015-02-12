function get_users(room_name) {
    return Rooms.find(
        {name: room_name}
    );
}

Template.hello.helpers({
    counter: function () {
        return Clicks.find().count();
    },
    room_users: function () {
        return get_users();
    }
//    last_click_date: function() {
//        var last_click = get_last_click();
//        if (last_click === undefined) {
//            return 'never';
//        }
//        return last_click.timestamp.toLocaleDateString();
//    },
//    last_click_time: function() {
//        var last_click = get_last_click();
//        if (last_click === undefined) {
//            return 'never';
//        }
//        return last_click.timestamp.toLocaleTimeString();
//    }
});

Template.hello.events({
    'click button#load_users': function () {
        // insert a click record when the button is clicked
        alert('ji');
    },
    'click button': function () {
        // insert a click record when the button is clicked
        Clicks.insert({
            timestamp: new Date()
        });
    }
});
