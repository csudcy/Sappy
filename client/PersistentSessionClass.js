PersistentSessionClass = function(prefix) {
    // Sort out what we want as the prefix
    if (prefix == undefined) {
        prefix = 'Default';
    }
    prefix = 'PersistentSession_'+prefix;

    // Load persistent session data from localStorage
    var data = localStorage.getItem(prefix+'data');
    if (!data) {
        // First time use
        data = {};
    } else {
        // Un-JSON cause localStorage is kinda sucky
        try {
            data = JSON.parse(data);
        } catch(err) {
            // Something broke; start again!
            data = {};
        }
    }

    // Set each item into the session
    Object.keys(data).forEach(function(key) {
        Session.set(prefix+key, data[key]);
    })

    this.get = function(key) {
        return Session.get(prefix+key);
    }
    this.set = function(key, value) {
        // Update the session
        Session.set(prefix+key, value);

        // Update the localStorage
        data[key] = value;
        localStorage.setItem(prefix+'data', JSON.stringify(data));
    }

    return this;
};
