Fib = new Object();

Fib.numbers = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
Fib.indexes = {};
Fib.numbers.forEach(function(val, index) {
    Fib.indexes[val] = index;
});

Fib.get_average_number = function(votes) {
    var sum = 0;
    for (var vote in votes) {
        sum += votes[vote];
    }
    return sum / votes.length;
};

Fib.workout_average_fib_number = function(votes) {
    var average = Math.round(Fib.get_average_number(votes)),
        average_fib = 0;

    Fib.numbers.forEach(function(fib_number) {
        if (Math.abs(fib_number - average) < Math.abs(average_fib - average)) {
            average_fib = fib_number;
        }
    });

    return average_fib;
};

Fib.is_extreme_vote = function(avg_fib_vote, vote) {
    var avg_fib_vote_index = Fib.indexes[avg_fib_vote],
        vote_index = Fib.indexes[vote];

    return Math.abs(vote_index - avg_fib_vote_index) > 1;
};
