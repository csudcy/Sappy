UI.body.events({
    'click .show_template': function(e) {
        var template_name = $(e.target).data('template'),
            template = Template[template_name],
            content = $('.content');
        content.html('');
        UI.render(template, content.get(0));
    }
});
