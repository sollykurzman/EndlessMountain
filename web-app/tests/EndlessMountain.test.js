import EndlessMountain from "../EndlessMountain.js";
import R from "../ramda.js";

describe("Inital Game State", function () {
    it(
        "Given an inital game state, the state is a valid game state",
        function () {
            const game_state = EndlessMountain.create_board();
            if (typeof game_state !== "object") {
                throw new Error(
                    "The board is not an object."
                );
            }
            if (!Object.keys(game_state).includes("width")) {
                throw new Error(
                    "The game state is missing the width parameter."
                );
            }
            if (typeof game_state.width !== "number") {
                throw new Error(
                    "The width param is a " +
                    typeof game_state.width +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("height")) {
                throw new Error(
                    "The game state is missing the height parameter."
                );
            }
            if (typeof game_state.height !== "number") {
                throw new Error(
                    "The height param is a " +
                    typeof game_state.height +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("player_x")) {
                throw new Error(
                    "The game state is missing the player_x parameter."
                );
            }
            if (typeof game_state.player_x !== "number") {
                throw new Error(
                    "The player_x param is a " +
                    typeof game_state.player_x +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("player_y")) {
                throw new Error(
                    "The game state is missing the player_y parameter."
                );
            }
            if (typeof game_state.player_y !== "number") {
                throw new Error(
                    "The player_y param is a " +
                    typeof game_state.player_y +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("obstacles")) {
                throw new Error(
                    "The game state is missing the obstacles parameter."
                );
            }
            if (!Array.isArray(game_state.obstacles)) {
                throw new Error(
                    "The obstacle param is a " +
                    typeof game_state.dx +
                    " when an array was expected."
                );
            }
            if (!Object.keys(game_state).includes("dy")) {
                throw new Error(
                    "The game state is missing the dy parameter."
                );
            }
            if (typeof game_state.dy !== "number") {
                throw new Error(
                    "The dy param is a " +
                    typeof game_state.dy +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("dx")) {
                throw new Error(
                    "The game state is missing the dx parameter."
                );
            }
            if (typeof game_state.dx !== "number") {
                throw new Error(
                    "The dx param is a " +
                    typeof game_state.dx +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("score")) {
                throw new Error(
                    "The game state is missing the score parameter."
                );
            }
            if (typeof game_state.score !== "number") {
                throw new Error(
                    "The score param is a " +
                    typeof game_state.score +
                    " when a number was expected."
                );
            }
            if (!Object.keys(game_state).includes("end_game")) {
                throw new Error(
                    "The game state is missing the end_game parameter."
                );
            }
            if (typeof game_state.end_game !== "boolean") {
                throw new Error(
                    "The score param is a " +
                    typeof game_state.end_game +
                    " when a boolean was expected."
                );
            }
            if (!Object.keys(game_state).length === 9) {
                throw new Error(
                    "Game state has a property that isnt required"
                );
            }
        }
    );
    it(
        "Given an inital game state, the empty state contains no obstacles",
        function () {
            const game_state = EndlessMountain.create_board();
            if (game_state.obstacles.length !== 0) {
                throw new Error(
                    "The empty state contains obstacles: " +
                    game_state.obstacles
                );
            }
        }
    );
    it(
        "Given an inital game state, the empty state returns a collision " +
        "indicator of 0",
        function () {
            const game_state = EndlessMountain.create_board();
            if (EndlessMountain.check_collision(game_state) !== 0) {
                throw new Error(
                    "The empty state returns a collision of " +
                    EndlessMountain.check_collision(game_state) +
                    "when 0 was expected."
                );
            }
        }
    );
});

describe("Player Positioning", function () {
    it(
        "Given an inital state, " +
        "when player position is updated, " +
        "a valid position is returned",
        function () {
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 0,
                player_y: 0,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.set_player_position(game_state);
            if (typeof game_state.player_x !== "number") {
                throw new Error(
                    "The players x position is a " +
                    typeof game_state.player_x +
                    " when a number was expected."
                );
            }
            if (typeof game_state.player_y !== "number") {
                throw new Error(
                    "The players y position is a " +
                    typeof game_state.player_y +
                    " when a number was expected."
                );
            }
        }
    );
    it(
        "Given an inital state, " +
        "When defining the inital player position" +
        "the position is within the game bounds",
        function () {
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 0,
                player_y: 0,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.set_player_position(game_state);
            if (
                game_state.player_x < 0 ||
                game_state.player_x > game_state.width
            ) {
                if (game_state.player_x < 0) {
                    throw new Error(
                        "The players x position returned was " +
                        game_state.player_x +
                        " this is to the left of the bounds of the game board"
                    );
                } else {
                    throw new Error(
                        "The players x position returned was " +
                        game_state.player_x +
                        " this is to the right of the bounds of the game board"
                    );
                }
            }
            if (
                game_state.player_y < 0 ||
                game_state.player_y > game_state.height
            ) {
                if (game_state.player_y < 0) {
                    throw new Error(
                        "The players y position returned was " +
                        game_state.player_y +
                        " this is below the minimum coordinate " +
                        "of the game board"
                    );
                } else {
                    throw new Error(
                        "The players y position returned was " +
                        game_state.player_y +
                        " this is above the max coordinate " +
                        "of the game board"
                    );
                }
            }
        }
    );
    it(
        "Given an inital state, " +
        "When defining the inital player position" +
        "The inital player position returns coordinates " +
        "that place the player at the centre of the game board",
        function () {
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 0,
                player_y: 0,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.set_player_position(game_state);
            if (
                game_state.player_x !==
                game_state.width / 2 - EndlessMountain.Player.width / 2
            ) {
                throw new Error(
                    "The player x position is set to " +
                    game_state.player_x +
                    ". This is not the horizontal centre of the game board, " +
                    (game_state.width / 2 - EndlessMountain.Player.width / 2) +
                    " was expected."
                );
            }
            if (
                game_state.player_y !==
                game_state.height / 2 - EndlessMountain.Player.height / 2
            ) {
                throw new Error(
                    "The player y position is set to " +
                    game_state.player_y +
                    ". This is not the vertical centre of the game board, " +
                    (
                        game_state.height / 2 -
                        EndlessMountain.Player.height / 2
                    ) +
                    " was expected."
                );
            }
        }
    );
});

describe("Creating Obstacles", function () {
    it(
        "Given a set game width, " +
        "The function returns a list " +
        "that is the get game width",
        function () {
            const game_width = 50;
            const returned = EndlessMountain.create_obstacles(game_width);
            if (returned.length !== game_width) {
                throw new Error(
                    "The function returned a list of length " +
                    returned.length +
                    " when a length of " +
                    game_width +
                    " was expected."
                );
            }
        }
    );
    it(
        "The function returns only valid obstacle indicators",
        function () {
            const game_width = 50;
            const valid_indicators = [0, 1, 2];
            const returned = EndlessMountain.create_obstacles(game_width);
            if (
                !(
                    R.all(
                        (obstacle) => valid_indicators.includes(obstacle)
                    )(
                        returned
                    )
                )
            ) {
                throw new Error(
                    "Not all elements in the list are valid obstacle " +
                    "indicators. The following was returned:" +
                    returned +
                    " when a list only including: " +
                    valid_indicators +
                    " was expected"
                );
            }
        }
    );
    it(
        "Given a game width of 0 is provided " +
        "Then function returns an empty list",
        function () {
            const game_width = 0;
            const returned = EndlessMountain.create_obstacles(game_width);
            if (!Array.isArray(returned) && !returned.length === 0) {
                throw new Error(
                    "When given an input of 0 an empty array was expected. " +
                    "Instead " +
                    returned +
                    " was returned."
                );
            }
        }
    );
});

describe("Adding Obstacles to the state", function () {
    it(
        "Given a valid game state, " +
        "Then function should return a game state " +
        "contianing an obstacles property of exlusively objects",
        function () {
            const obstacles = [0, 0, 0, 1, 0, 1, 2];
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 490,
                player_y: 480,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.add_obstacles(
                obstacles,
                0,
                game_state
            );
            if (
                !(
                    R.all(
                        (obstacle) => typeof obstacle === "object"
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all the obstacles in game_state.obstacles " +
                    "are not objects"
                );
            }
        }
    );
    it(
        "Given a valid game state, " +
        "Each obstacle in the newly returned state should " +
        "have the properties: type, x and y and no others",
        function () {
            const obstacles = [0, 0, 0, 1, 0, 1, 2];
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 490,
                player_y: 480,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.add_obstacles(
                obstacles,
                0,
                game_state
            );
            if (
                !(
                    R.all(
                        (obstacle) => obstacle.hasOwnProperty("type")
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all obstacles do not have the type property"
                );
            }
            if (
                !(
                    R.all(
                        (obstacle) => obstacle.hasOwnProperty("x")
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all obstacles do not have the x property"
                );
            }
            if (
                !(
                    R.all(
                        (obstacle) => obstacle.hasOwnProperty("y")
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all obstacles do not have the y property"
                );
            }
            if (
                !(
                    R.all(
                        (obstacle) => Object.keys(obstacle).length === 3
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all obstacles have a property " +
                    "that is not type, x and y"
                );
            }
        }
    );
    it(
        "Given a valid game state, " +
        "Each obstacle in the returned game state should have " +
        " a valid identifier and positioning " +
        "that reflects the inital array index",
        function () {
            const obstacles = [0, 0, 0, 1, 0, 1, 2];
            let game_state = {
                width: 1000,
                height: 1000,
                player_x: 490,
                player_y: 480,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            game_state = EndlessMountain.add_obstacles(
                obstacles,
                0,
                game_state
            );
            let obstacle_count = 0;
            obstacles.forEach(
                function (obstacle, index) {
                    if (obstacle !== 0) {
                        if (
                            obstacle !==
                            game_state.obstacles[obstacle_count].type
                        ) {
                            throw new Error(
                                "Some/all obstacles have an " +
                                "invalid obstacle type"
                            );
                        }
                        if (
                            index * EndlessMountain.board_cell !==
                            game_state.obstacles[obstacle_count].x
                        ) {
                            throw new Error(
                                "Some/all obstacles have an " +
                                "invalid x coordinate"
                            );
                        }
                        obstacle_count += 1;
                    }
                }
            );
            if (
                !(
                    R.all(
                        (obstacle) => obstacle.y === game_state.height
                    )(
                        game_state.obstacles
                    )
                )
            ) {
                throw new Error(
                    "Some/all obstacles have an invalid starting y position"
                );
            }
        }
    );
});

describe("Move Obstacles Up the Board", function () {
    it(
        "Given a valid game state with obstacles, " +
        "then a game state is returned where the Obstacles " +
        " are all moved up the board by dy",
        function () {
            let inital_game_state = {
                width: 1000,
                height: 1000,
                player_x: 490,
                player_y: 480,
                obstacles: [
                    {
                        type: 1,
                        x: 60,
                        y: 1000
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }
                ],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            let final_game_state = EndlessMountain.update_obstacles(
                inital_game_state
            );
            let final_obstacles = final_game_state.obstacles;
            inital_game_state.obstacles.forEach(function (obstacle, index) {
                if (
                    obstacle.y - inital_game_state.dy !==
                    final_obstacles[index].y
                ) {
                    throw new Error(
                        "Some/all obstacles position did not update by dy, " +
                        "The following obstacles were returned: " +
                        JSON.stringify(final_obstacles) +
                        " when " +
                        JSON.stringify([
                            {
                                type: 1,
                                x: 60,
                                y: 996
                            },
                            {
                                type: 1,
                                x: 100,
                                y: 996
                            }, {
                                type: 2,
                                x: 120,
                                y: 996
                            }
                        ]) +
                        " was expected"
                    );
                }
            });
        }
    );
    it(
        "Given an inital game state with no obstacles, " +
        "when updating the obstacles" +
        "then the same game state is returned",
        function () {
            let inital_game_state = {
                width: 1000,
                height: 1000,
                player_x: 490,
                player_y: 480,
                obstacles: [],
                dy: 4,
                dx: 2,
                score: 0,
                end_game: false
            };
            let final_game_state = EndlessMountain.update_obstacles(
                inital_game_state
            );
            if (!R.equals(inital_game_state, final_game_state)) {
                throw new Error(
                    "When updating the obstacles in a game state with" +
                    "no obstacles, " +
                    JSON.stringify(final_game_state) +
                    " was returned, when " +
                    JSON.stringify(inital_game_state) +
                    " was expected"
                );
            }
        }
    );
});

describe(
    "Removing Obstacles from the state",
    function () {
        it(
            "Given an list of obstacles with one out of bounds, " +
            "when removing obstacles, " +
            "then a game state is returned without the out of bounds obstacle",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: -2
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.delete_obstacles(
                    inital_game_state,
                    0
                );
                let expected_final_state = inital_game_state;
                expected_final_state.obstacles = [
                    inital_game_state.obstacles[1],
                    inital_game_state.obstacles[2]
                ];
                if (
                    !R.equals(final_game_state, expected_final_state)
                ) {
                    throw new Error(
                        "The function did not remove the expected obstacle" +
                        JSON.stringify(final_game_state) +
                        "was returned, where " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [{
                                type: 1,
                                x: 100,
                                y: 1000
                            }, {
                                type: 2,
                                x: 120,
                                y: 1000
                            }],
                            dy: 4,
                            dx: 2,
                            score: 0,
                            end_game: false
                        }) +
                        "was expected."
                    );
                }
            }
        );
        it(
            "Given a state with all obstacles out of bounds " +
            "when removing obstacles, " +
            "then a game state without any obtacles is returned",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: -40
                    }, {
                        type: 1,
                        x: 100,
                        y: -40
                    }, {
                        type: 2,
                        x: 120,
                        y: -40
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.delete_obstacles(
                    inital_game_state,
                    0
                );
                let expected_final_state = inital_game_state;
                expected_final_state.obstacles = [];
                if (final_game_state.obstacles.length !== 0) {
                    throw new Error(
                        "The function did not return an empty " +
                        "obstacles array: " +
                        JSON.stringify(final_game_state) +
                        "was returned, when " +
                        JSON.stringify({expected_final_state}) +
                        "was expected."
                    );
                }
            }
        );
        it(
            "Given a game state with no obstacles out of bounds, " +
            "when removing obstacles, " +
            "then the same game state is returned",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: 100
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.delete_obstacles(
                    inital_game_state,
                    0
                );
                if (
                    !R.equals(final_game_state, inital_game_state)
                ) {
                    throw new Error(
                        "The function did not return an identical game_state" +
                        JSON.stringify(final_game_state) +
                        "was returned, when " +
                        JSON.stringify({inital_game_state}) +
                        "was expected."
                    );
                }
            }
        );
        it(
            "Given a game state with no obstacles, " +
            "when removing obstacles, " +
            "then the same game state is returned",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.delete_obstacles(
                    inital_game_state
                );
                if (!R.equals(inital_game_state, final_game_state)) {
                    throw new Error(
                        "When deleting the obstacles in a game state with" +
                        "no obstacles, " +
                        JSON.stringify(final_game_state) +
                        " was returned, when " +
                        JSON.stringify(inital_game_state) +
                        " was expected"
                    );
                }
            }
        );
    }
);

describe(
    "Move the player left",
    function () {
        it(
            "Given a valid game state, " +
            "when the player is moved left " +
            "then a game state is returned " +
            "with the player_x position changed by - dx",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: 100
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.move_left(
                    inital_game_state
                );
                let expected_final_state = inital_game_state;
                expected_final_state.player_x = (
                    inital_game_state.player_x -
                    inital_game_state.dx
                );
                if (
                    !R.equals(final_game_state, expected_final_state)
                ) {
                    throw new Error(
                        "The function did not return a game_state " +
                        "with the new player position moved left: " +
                        JSON.stringify(final_game_state) +
                        "was returned, when" +
                        JSON.stringify(expected_final_state) +
                        "was expected."
                    );
                }
            }
        );
        it(
            "given a valid game state, " +
            "when the player is at the left edge of the board" +
            "then the same game state is returned",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: 100
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.move_left(
                    inital_game_state
                );
                if (!R.equals(inital_game_state, final_game_state)) {
                    throw new Error(
                        "With the player at the left edge of the board" +
                        "the function didn't return the same state: " +
                        JSON.stringify(final_game_state) +
                        " was returned, when " +
                        JSON.stringify(inital_game_state) +
                        "was expected"
                    );
                }
            }
        );
    }
);

describe(
    "Move the player right",
    function () {
        it(
            "Given a valid game state, " +
            "when the player is moved right " +
            "then a game state is returned " +
            "with the player_x position changed by + dx",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: 100
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.move_right(
                    inital_game_state
                );
                let expected_final_state = inital_game_state;
                expected_final_state.player_x = (
                    inital_game_state.player_x +
                    inital_game_state.dx
                );
                if (
                    !R.equals(final_game_state, expected_final_state)
                ) {
                    throw new Error(
                        "The function did not return a game_state " +
                        "with the new player position moved right: " +
                        JSON.stringify(final_game_state) +
                        "was returned, when" +
                        JSON.stringify(expected_final_state) +
                        "was expected."
                    );
                }
            }
        );
        it(
            "given a valid game state, " +
            "when the player is at the right edge of the board" +
            "then the same game state is returned",
            function () {
                let inital_game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 999,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 60,
                        y: 100
                    }, {
                        type: 1,
                        x: 100,
                        y: 1000
                    }, {
                        type: 2,
                        x: 120,
                        y: 1000
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.move_right(
                    inital_game_state
                );
                if (!R.equals(inital_game_state, final_game_state)) {
                    throw new Error(
                        "When the game is at the right edge of the board" +
                        "the function doesnt return the same state: " +
                        JSON.stringify(final_game_state) +
                        " was returned, when " +
                        JSON.stringify(inital_game_state) +
                        "was expected"
                    );
                }
            }
        );
    }
);

describe(
    "Given about to collide and takes action",
    function () {
        it(
            "Given the player is about to collide," +
            "When the player moves left, " +
            "so the player is now not in line to collide, " +
            "then a 0 (no collision) collision indicator is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 - EndlessMountain.board_cell + 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_left(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== 0) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where 0 was expected"
                    );
                }
            }
        );
        it(
            "Given the player is about to collide, " +
            "When the player moves right, " +
            "so the player is now not in line to collide, " +
            "then a 0 (no collision) collision indicator is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 + EndlessMountain.board_cell - 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_right(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== 0) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where 0 was expected"
                    );
                }
            }
        );
        it(
            "Given the player is about to collide, " +
            "when the player does not move, " +
            "so the player is still in line to collide, " +
            "then the collision indicator of the obstacle is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== game_state.obstacles[0].type) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where " +
                        game_state.obstacles[0].type +
                        " was expected"

                    );
                }
            }
        );
        it(
            "Given the player is about to collide, " +
            "when the player moves left, " +
            "so the player is still in line to collide, " +
            "then the collision indicator of the obstacle is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_left(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== game_state.obstacles[0].type) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where " +
                        game_state.obstacles[0].type +
                        " was expected"

                    );
                }
            }
        );
        it(
            "Given the player is about to collide, " +
            "when the player moves right, " +
            "so the player is still in line to collide, " +
            "then the collision indicator of the obstacle is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_right(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== game_state.obstacles[0].type) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where " +
                        game_state.obstacles[0].type +
                        " was expected"
                    );
                }
            }
        );
    }
);

describe(
    "Given not about to collide and then takes action",
    function () {
        it(
            "Given the player is not about to collide, " +
            "when the player moves left, " +
            "so the player is still not in line to collide, " +
            "then a 0 (no collision) collision indicator is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 - EndlessMountain.board_cell - 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_left(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== 0) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where 0 was expected"
                    );
                }
            }
        );
        it(
            "Given the player is not about to collide, " +
            "when the player moves right, " +
            "so the player is still not in line to collide, " +
            "then a 0 (no collision) collision indicator is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 + EndlessMountain.board_cell + 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_right(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== 0) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where 0 was expected"
                    );
                }
            }
        );
        it(
            "Given the player is not about to collide, " +
            "when the player does not move, " +
            "so the player is still not in line to collide, " +
            "then a 0 (no collision) collision indicator is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 + EndlessMountain.board_cell + 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== 0) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        " where 0 was expected"
                    );
                }
            }
        );
        it(
            "Given the player is not about to collide, " +
            "when the player moves left, " +
            "so the player is in line to collide, " +
            "the collision indicator of the obstacle is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 + EndlessMountain.board_cell + 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_left(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== game_state.obstacles[0].type) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        "where " +
                        game_state.obstacles[0].type +
                        " was expected"
                    );
                }
            }
        );
        it(
            "Given the player is not about to collide, " +
            "when the player moves right, " +
            "so the player is in line to collide, " +
            "the collision indicator of the obstacle is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490 - EndlessMountain.board_cell - 1,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 20
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                game_state = EndlessMountain.update_obstacles(game_state);
                game_state = EndlessMountain.move_right(game_state);
                const collision = EndlessMountain.check_collision(game_state);
                if (collision !== game_state.obstacles[0].type) {
                    throw new Error(
                        "a " +
                        collision +
                        " collision indicator was returned, " +
                        "where " +
                        game_state.obstacles[0].type +
                        " was expected"
                    );
                }
            }
        );
    }
);

describe(
    "Updating score",
    function () {
        it(
            "Given a game state with score of 0, " +
            "when passing a change of any integer value, " +
            "then a game state with score set to that integer " +
            "value is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.update_score(
                    5,
                    game_state
                );
                if (final_game_state.score !== 5) {
                    throw new Error(
                        "Passing a change factor of 5 and a game_state of " +
                        "score = 0, a game state with score of 5 was " +
                        "not returned:" +
                        JSON.stringify(final_game_state) +
                        "was returned, when: " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [],
                            dy: 4,
                            dx: 2,
                            score: 5,
                            end_game: false
                        }) + " was expected"
                    );
                }
            }
        );
        it(
            "Given a game state with score set to any integer value, " +
            "when passing a change of any integer value " +
            "then a game state with score set to that integer " +
            "value is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 11,
                    end_game: false
                };
                let final_game_state = EndlessMountain.update_score(
                    5,
                    game_state
                );
                if (final_game_state.score !== 16) {
                    throw new Error(
                        "Passing a change factor of 5 and a game_state of " +
                        "score = 11, a game state with score of 16 was " +
                        "not returned:" +
                        JSON.stringify(final_game_state) +
                        "was returned, when: " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [],
                            dy: 4,
                            dx: 2,
                            score: 5,
                            end_game: false
                        }) + " was expected"
                    );
                }
            }
        );
        it(
            "Given a game state with score of 0, " +
            "when passing a change of 0 " +
            "then the same game state is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let final_game_state = EndlessMountain.update_score(
                    0,
                    game_state
                );
                if (!R.equals(game_state, final_game_state)) {
                    throw new Error(
                        "Passing a change factor of 0 and a game_state of " +
                        "score = 0, the same game_state was expected, " +
                        "instead: " +
                        JSON.stringify(final_game_state) +
                        "was returned, when: " +
                        JSON.stringify(game_state) + " was expected"
                    );
                }
            }
        );
        it(
            "Given a game state with score of 11, " +
            "when passing a change of 0 " +
            "then the same game state is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 11,
                    end_game: false
                };
                let final_game_state = EndlessMountain.update_score(
                    0,
                    game_state
                );
                if (!R.equals(game_state, final_game_state)) {
                    throw new Error(
                        "Passing a change factor of 0 and a game_state of " +
                        "score = 11, the same game_state was expected, " +
                        "instead: " +
                        JSON.stringify(final_game_state) +
                        "was returned, when: " +
                        JSON.stringify(game_state) + " was expected"
                    );
                }
            }
        );
    }
);

describe(
    "End Game",
    function () {
        it(
            "Given a collision with a tree is detected," +
            "then a game_state with end_game = true is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480 - 40
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let collision = EndlessMountain.check_collision(game_state);
                let final_game_state = EndlessMountain.game_is_ended(
                    collision,
                    game_state
                );
                if (!final_game_state.end_game) {
                    throw new Error(
                        "Passing a collision of 1 to game_is_ended " +
                        "did not return the game_state with end_game set " +
                        "to true, instead: " +
                        JSON.stringify(final_game_state) +
                        "was returned when " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [{
                                type: 1,
                                x: 490 - EndlessMountain.board_cell,
                                y: 480 - 40
                            }],
                            dy: 4,
                            dx: 2,
                            score: 0,
                            end_game: true
                        }) + " was expected"
                    );
                }
            }
        );
        it(
            "Given no end game collision is detected," +
            "then a game_state with end_game = false is returned",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [{
                        type: 1,
                        x: 490 - EndlessMountain.board_cell,
                        y: 480
                    }],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let collision = EndlessMountain.check_collision(game_state);
                let final_game_state = EndlessMountain.game_is_ended(
                    collision,
                    game_state
                );
                if (final_game_state.end_game) {
                    throw new Error(
                        "Passing a collision of 0 to game_is_ended " +
                        "did not return the game_state with end_game set " +
                        "to false, instead: " +
                        JSON.stringify(final_game_state) +
                        "was returned when " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [{
                                type: 1,
                                x: 490 - EndlessMountain.board_cell,
                                y: 480 - 40
                            }],
                            dy: 4,
                            dx: 2,
                            score: 0,
                            end_game: false
                        }) + " was expected"
                    );
                }
            }
        );
        it(
            "Given a game_state with no obstacles," +
            "then end game returns a game_state with end_game = false",
            function () {
                let game_state = {
                    width: 1000,
                    height: 1000,
                    player_x: 490,
                    player_y: 480,
                    obstacles: [],
                    dy: 4,
                    dx: 2,
                    score: 0,
                    end_game: false
                };
                let collision = EndlessMountain.check_collision(game_state);
                let final_game_state = EndlessMountain.game_is_ended(
                    collision,
                    game_state
                );
                if (final_game_state.end_game) {
                    throw new Error(
                        "Passing a state with no obstacles into end game" +
                        "did not return the game_state with end_game set " +
                        "to false, instead: " +
                        JSON.stringify(final_game_state) +
                        "was returned when " +
                        JSON.stringify({
                            width: 1000,
                            height: 1000,
                            player_x: 490,
                            player_y: 480,
                            obstacles: [{
                                type: 1,
                                x: 490 - EndlessMountain.board_cell,
                                y: 480 - 40
                            }],
                            dy: 4,
                            dx: 2,
                            score: 0,
                            end_game: false
                        }) + " was expected"
                    );
                }
            }
        );
    }
);