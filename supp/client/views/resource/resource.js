function print_rooms () {
    Rooms.find().forEach(function(item){
        console.log(item);
    });
}

Template.resource.helpers({
    room_name: function () {
        return PersistentSession.get('room');
    },
    user_name: function () {
        return PersistentSession.get('user');
    },
    numbers: function () {
        return [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?', 'C'];
    },

});

Template.resource.events({
    'click .number': function (event, template) {
        // Sort out the classes
        $('.number').removeClass('selected');
        $(event.target).addClass('selected');

        // work out which user to set the value for
        var set = {};
        set['users.' + PersistentSession.get('user')] =  $(event.target).val();

        //  update the user's value in the room
        Rooms.update(
            {
                '_id': PersistentSession.get('room'),
            },
            {
                $set: set
            }
        );

        // for debugging - shall remove later
        print_rooms();
    }
});
