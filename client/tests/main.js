assertEqual = function(val1, val2, msg) {
    if (val1 !== val2) {
        console.error('Assertion error: "'+val1+' !== '+val2+'" : '+msg);
    }
};

assertEqualMulti = function(vals, msg) {
    vals.forEach(function(val_pair) {
        assertEqual(val_pair[0], val_pair[1], msg);
    });
};
