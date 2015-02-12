// Get something straight from the Session
Handlebars.registerHelper(
    'session',
    function (key) {
        return Session.get(key);
    }
);

// Get something straight from the PersistentSession
Handlebars.registerHelper(
    'persistent_session',
    function (key) {
        return PersistentSession.get(key);
    }
);
