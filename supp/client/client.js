// This is a global function
show_template = function(template) {
    var content = $('.content');
    content.html('');
    UI.render(template, content.get(0));
}

// This is a global variable
PersistentSession = new PersistentSessionClass();


UI.body.events({
    'click .show_template': function(e) {
        var template_name = $(e.target).data('template'),
            template = Template[template_name];
        show_template(template);
    }
});
