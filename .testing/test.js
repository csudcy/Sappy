setTimeout(function() {
    // $('div').fireworks();

    $('#on_red').click(function() {
        $('div.red').fireworks();
    });
    $('#on_blue').click(function() {
        $('div.blue').fireworks();
    });
    $('#on_both').click(function() {
        $('div').fireworks();
    });
    $('#off_red').click(function() {
        $('div.red').fireworks('destroy');
    });
    $('#off_blue').click(function() {
        $('div.blue').fireworks('destroy');
    });
    $('#off_both').click(function() {
        $('div').fireworks('destroy');
    });
});
