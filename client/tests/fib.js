// Unit tests, yay!

assertEqualMulti(
    [
        [
            Fib.get_average_number([0, 0]),
            0
        ],
        [
            Fib.get_average_number([0, 1]),
            0.5
        ],
        [
            Fib.get_average_number([1, 1]),
            1
        ],
        [
            Fib.get_average_number([0, 100]),
            50
        ]
    ],
    'Fib.get_average_number'
);

assertEqualMulti(
    [
        [
            Fib.workout_average_fib_number([0, 0]),
            0
        ],
        [
            Fib.workout_average_fib_number([0, 1]),
            1
        ],
        [
            Fib.workout_average_fib_number([1, 1]),
            1
        ],
        [
            Fib.workout_average_fib_number([0, 100]),
            40
        ],
        [
            Fib.workout_average_fib_number([0, 1, 2, 3, 5, 8, 13]),
            5
        ]
    ],
    'Fib.workout_average_fib_number'
);

assertEqualMulti(
    [
        // Lower end
        [
            Fib.is_extreme_vote(0, 0),
            false
        ],
        [
            Fib.is_extreme_vote(0, 1),
            false
        ],
        [
            Fib.is_extreme_vote(0, 2),
            true
        ],

        // Middle
        [
            Fib.is_extreme_vote(8, 3),
            true
        ],
        [
            Fib.is_extreme_vote(8, 5),
            false
        ],
        [
            Fib.is_extreme_vote(8, 8),
            false
        ],
        [
            Fib.is_extreme_vote(8, 13),
            false
        ],
        [
            Fib.is_extreme_vote(8, 20),
            true
        ],

        // Upper
        [
            Fib.is_extreme_vote(100, 20),
            true
        ],
        [
            Fib.is_extreme_vote(100, 40),
            false
        ],
        [
            Fib.is_extreme_vote(100, 100),
            false
        ],

        // Extreme
        [
            Fib.is_extreme_vote(0, 100),
            true
        ],
    ],
    'Fib.is_extreme_vote'
);
