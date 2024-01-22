import R from "./ramda.js";

/**
 * EndlessMountain is a game object that plays the EndlessMountain game.
 * @namespace EndlessMountain
 * @author Solomon Kurzman
 * @version 2022.23
 */

/**
 * the state of the game defined by parameters.
 * @memberof EndlessMountain
 * @typedef {Object} GameState
 */

const EndlessMountain = Object.create(null);

/**
 * A board cell is a standard number of coordinate points used to standardise
 * object widths and spacing within the game.
 * @memberof EndlessMountain
 * @typedef {number} BoardCell
 */

EndlessMountain.board_cell = 20;

/**
 * A Player object defines the width and height of the player for use in
 * collision calculations and positioning.
 * @memberof EndlessMountain
 * @typedef {Object} Player
 */

EndlessMountain.Player = Object.freeze({
    width: 1 * EndlessMountain.board_cell,
    height: 2 * EndlessMountain.board_cell
});

/**
 * A Tree object defines the type identifier, width, height, collision offsets
 * and collision widths of the Tree obstacle for use in collision calculations
 * and positioning.
 * @memberof EndlessMountain
 * @typedef {Object} Tree
 */

EndlessMountain.Tree = Object.freeze({
    type: 1,
    width: 3 * EndlessMountain.board_cell,
    height: 5 * EndlessMountain.board_cell,
    collision_x_offset: EndlessMountain.board_cell,
    collision_y_offset: 3 * EndlessMountain.board_cell,
    collision_width: EndlessMountain.board_cell,
    collision_height: EndlessMountain.board_cell
});

/**
 * A Rock object defines the type identifier, width, height, collision offsets
 * and collision widths of the Rock obstacle for use in collision calculations
 * and positioning.
 * @memberof EndlessMountain
 * @typedef {Object} Rock
 */

EndlessMountain.Rock = Object.freeze({
    type: 2,
    width: 2.5 * EndlessMountain.board_cell,
    height: 2.5 * EndlessMountain.board_cell,
    collision_x_offset: 0.5 * EndlessMountain.board_cell,
    collision_y_offset: 0,
    collision_width: 2 * EndlessMountain.board_cell,
    collision_height: 2 * EndlessMountain.board_cell
});

/**
 * Create a new empty game state.
 * Optionally with a specified board width and board height,
 * otherwise returns a standard 1000 wide, 1000 high board.
 * @memberof EndlessMountain
 * @function
 * @param {number} [width = 1000] The width of the new board.
 * @param {number} [height = 1000] The height of the new board.
 * @returns {GameState} An inital game state.
 */

EndlessMountain.create_board = function (
    width = 1000,
    height = 1000
) {
    return {
        width: width,
        height: height,
        player_x: 0,
        player_y: 0,
        obstacles: [],
        dy: 4,
        dx: 2,
        score: 0,
        end_game: false
    };
};

/**
 * Sets the players position on the board to be the centre of the board,
 * this is dependent on the players width and height and
 * the board height and the board width.
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state the state of the game defined by parameters
 * @returns {GameState} the game state with set player positions
 */

EndlessMountain.set_player_position = function (
    game_state
) {
    return {
        width: game_state.width,
        height: game_state.height,
        player_x: (game_state.width / 2) - (EndlessMountain.Player.width / 2),
        player_y: (game_state.height / 2) - (EndlessMountain.Player.height / 2),
        obstacles: game_state.obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score,
        end_game: game_state.end_game
    };
};

/**
 * A function that generates a random row of obstacles for use in game.
 * @memberof EndlessMountain
 * @function
 * @param {number} game_width the width of the game board interms of board cells
 * @returns {Array} an array of obstacle type identifiers
 */

EndlessMountain.create_obstacles = function (game_width) {
    let new_obstacles = [];
    let obstacle_probability = 75;
    R.range(0, game_width).map(function () {
        if (
            Math.floor(
                Math.random() * obstacle_probability
            ) > (obstacle_probability - 2)
        ) {
            new_obstacles.push(1);
        } else if (
            Math.floor(
                Math.random() * obstacle_probability * 50
            ) > (obstacle_probability * 50 - 2)
        ) {
            new_obstacles.push(2);
        } else {
            new_obstacles.push(0);
        }
    });
    return new_obstacles;
};

/**
 * A function that adds new obtacles to the game_state and sets their type,
 * inital x position and inital y position on the board.
 * @memberof EndlessMountain
 * @function
 * @param {Array} obstacle_row an array of obstacle indicators
 * @param {number} clearance_height a value that defines the height for the
 * obstacle to start of the board
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with added obstacles
 */

EndlessMountain.add_obstacles = function (
    obstacle_row,
    clearance_height,
    game_state
) {
    const obstacles = obstacle_row.reduce(
        function (obstacles, obstacle, i) {
            if (obstacle !== 0) {
                obstacles.push(
                    {
                        type: obstacle,
                        x: EndlessMountain.board_cell * i,
                        y: game_state.height + clearance_height
                    }
                );
                return obstacles;
            }
            return obstacles;
        },
        game_state.obstacles
    );
    return {
        width: game_state.width,
        height: game_state.height,
        player_x: game_state.player_x,
        player_y: game_state.player_y,
        obstacles: obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score,
        end_game: game_state.end_game
    };
};

/**
 * A function that updates the positions of obstacles by a specified dy,
 * hence moving the obstacles y position up the board
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with the moved obstacles
 */

EndlessMountain.update_obstacles = function (
    game_state
) {
    const obstacles = game_state.obstacles.map(
        function (obstacle) {
            return {
                type: obstacle.type,
                x: obstacle.x,
                y: obstacle.y - game_state.dy
            };
        }
    );
    return {
        width: game_state.width,
        height: game_state.height,
        player_x: game_state.player_x,
        player_y: game_state.player_y,
        obstacles: obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score,
        end_game: game_state.end_game
    };
};

/**
 * A function that removes obstacles from the obstacle array that have left
 * the game board
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state an object that contains the state of the game
 * @param {number} clearance_height the height at which the objects will be off
 * the game board
 * @returns {GameState} the new state of game with the deleted obstacles
 */

EndlessMountain.delete_obstacles = function (
    game_state,
    clearance_height
) {
    const obstacles = game_state.obstacles.filter(
        function (obstacle) {
            return obstacle.y > 0 - clearance_height;
        }
    );
    return {
        width: game_state.width,
        height: game_state.height,
        player_x: game_state.player_x,
        player_y: game_state.player_y,
        obstacles: obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score,
        end_game: game_state.end_game
    };
};

/**
 * A function updates the player position to move the player to the left by a
 * set dx
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with new player position
 */

EndlessMountain.move_left = function (
    game_state
) {
    if (
        (
            game_state.player_x - game_state.dx
        ) > 0
    ) {
        return {
            width: game_state.width,
            height: game_state.height,
            player_x: game_state.player_x - game_state.dx,
            player_y: game_state.player_y,
            obstacles: game_state.obstacles,
            dy: game_state.dy,
            dx: game_state.dx,
            score: game_state.score,
            end_game: game_state.end_game
        };
    } else {
        return game_state;
    }
};

/**
 * A function updates the player position to move the player to the right by a
 * set dx
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with new player position
 */

EndlessMountain.move_right = function (
    game_state
) {
    if (
        (
            game_state.player_x + game_state.dx + EndlessMountain.Player.width
        ) < game_state.width
    ) {
        return {
            width: game_state.width,
            height: game_state.height,
            player_x: game_state.player_x + game_state.dx,
            player_y: game_state.player_y,
            obstacles: game_state.obstacles,
            dy: game_state.dy,
            dx: game_state.dx,
            score: game_state.score,
            end_game: game_state.end_game
        };
    } else {
        return game_state;
    }
};

/**
 * A function that checks if the player has collided with an obstacle and
 * returns the type identifier for the of obstacle collided with
 * @memberof EndlessMountain
 * @function
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {number} the type identifier of the obstacle collided with
 */

EndlessMountain.check_collision = function (
    game_state
) {
    let xCollision = false;
    let yCollision = false;
    let collision = 0;
    let obstacle_type = 0;
    game_state.obstacles.find(function (obstacle) {
        if (obstacle.type === 1) {
            obstacle_type = EndlessMountain.Tree;
        }
        if (obstacle.type === 2) {
            obstacle_type = EndlessMountain.Rock;
        }
        if (
            (
                game_state.player_x +
                EndlessMountain.Player.width
            ) > (
                obstacle.x +
                obstacle_type.collision_x_offset
            )
            &&
            (
                obstacle.x +
                obstacle_type.collision_x_offset +
                obstacle_type.collision_width
            ) > game_state.player_x
        ) {
            xCollision = true;
        }
        if (
            (
                game_state.player_y +
                EndlessMountain.Player.height
            ) > (
                obstacle.y +
                obstacle_type.collision_y_offset
            )
            &&
            (
                obstacle.y +
                obstacle_type.collision_y_offset +
                obstacle_type.collision_height
            ) > game_state.player_y
        ) {
            yCollision = true;
        }
        if (xCollision && yCollision) {
            collision = obstacle.type;
            return true;
        }
        xCollision = false;
        yCollision = false;
        return false;
    });
    return collision;
};

/**
 * A function that updates the score of the game
 * @memberof EndlessMountain
 * @function
 * @param {number} change the value to change the score by
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with new score
 */

EndlessMountain.update_score = function (
    change,
    game_state
) {
    return {
        width: game_state.width,
        height: game_state.height,
        player_x: game_state.player_x,
        player_y: game_state.player_y,
        obstacles: game_state.obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score + change,
        end_game: game_state.end_game
    };
};

/**
 * A function that checks if the player had died
 * @memberof EndlessMountain
 * @function
 * @param {number} collision the type identifier of a particular collision
 * @param {GameState} game_state an object that contains the state of the game
 * @returns {GameState} the new state of game with end_game updated
 *  to reflect if the game is ended
 */

EndlessMountain.game_is_ended = function (
    collision,
    game_state
) {
    if (collision === 1 || collision === 2) {
        return {
            width: game_state.width,
            height: game_state.height,
            player_x: game_state.player_x,
            player_y: game_state.player_y,
            obstacles: game_state.obstacles,
            dy: game_state.dy,
            dx: game_state.dx,
            score: game_state.score,
            end_game: true
        };
    } else {
        return game_state;
    }
};

export default Object.freeze(EndlessMountain);