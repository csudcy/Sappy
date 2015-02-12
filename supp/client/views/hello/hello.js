function get_last_click() {
    return Clicks.findOne(
        {},
        {
            sort: {timestamp: -1}
        }
    );
}

Template.hello.helpers({
    counter: function () {
        return Clicks.find().count();
    },
    last_click_date: function() {
        var last_click = get_last_click();
        if (last_click === undefined) {
            return 'never';
        }
        return last_click.timestamp.toLocaleDateString();
    },
    last_click_time: function() {
        var last_click = get_last_click();
        if (last_click === undefined) {
            return 'never';
        }
        return last_click.timestamp.toLocaleTimeString();
    }
});

Template.hello.events({
    'click button': function () {
        // insert a click record when the button is clicked
        Clicks.insert({
            timestamp: new Date()
        });
    }
});
