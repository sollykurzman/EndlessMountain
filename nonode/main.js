// //import R from "./ramda.js";
// import R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

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

EndlessMountain.range = function (
    from,
    to
) {
    var result = [];
    var n = from;

    while (n < to) {
        result.push(n);
        n += 1;
    }

    return result;
}

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

EndlessMountain.update_board = function (
    game_state,
    width = 1000,
    height = 1000
) {
    return {
        width: width,
        height: height,
        player_x: game_state.player_x,
        player_y: game_state.player_y,
        obstacles: game_state.obstacles,
        dy: game_state.dy,
        dx: game_state.dx,
        score: game_state.score,
        end_game: game_state.end_game
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
    EndlessMountain.range(0, game_width).map(function () {
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

//IMPORT FIX ABOVE THIS LINE

//Set the width of the game interms of the board_cell property
let game_width = Math.ceil(window.innerWidth / EndlessMountain.board_cell);
//Set the height of the game interms of the board_cell property
let game_height = Math.ceil(window.innerHeight / EndlessMountain.board_cell);
//the game canvas
const canvas = document.querySelector("canvas");
//getting canvas context
const c = canvas.getContext("2d");
//selects the score div on html
const score_display = document.querySelector("#score");
//select the pause button
const pause_button = document.querySelector("#pause");
//select the title
const game_title = document.querySelector("#title");
//select the instructions
const game_instructions = document.querySelector("#instructions");
//select the end_game
const end_game_page = document.querySelector("#end_game");
//select the end_game_content
const end_game_content = document.querySelector("#end_game_content");
//indicates if the left key is being pressed or not
let left_key = false;
//indicates if the right key is being pressed or not
let right_key = false;
//indicates if the left button is being pressed or not
let left_button = false;
//indicates if the right button is being pressed or not
let right_button = false;
//indicates if the game is paused
let paused = true;
//indicator to trigger new obstacles
let trigger_obstacles = 0;
//initial speed of obstacles
let intial_dy = 4;
//set ski angle
let ski_angle = 0;
//set change in ski angle
let da = 4;
//define the game_state outside the scope
let game_state = {};

//set the pause state to true or false
function pause() {
    //if game is not paused
    if (paused === false) {
        //pause it
        paused = true;
        //change the pause button icon
        pause_button.src = "assets/paused_button.svg";
        //change the game title width
        game_title.style.transform = "scale(1)";
        //if the player has died
        if (game_state.end_game) {
            //show the end game screen
            end_game_page.style.opacity = "1";
            //zoom the end game instructions in
            end_game_content.style.transform = "translate(-50%, -50%) scale(1)";
        //if the player has not died
        } else {
            //set the game instructions to be visible
            game_instructions.style.opacity = "1";
        }
    //if game is paused
    } else {
        //set paused to false
        paused = false;
        //change the pause button icon
        pause_button.src = "assets/pause_button.svg";
        //change the game title width
        if (window.innerWidth > 450) {
            game_title.style.transform = "scale(0.5)";
        } else {
            game_title.style.width = "scale(0.8)";
        }
        //hide the game instructions
        game_instructions.style.opacity = "0";
        //the player had died
        if (game_state.end_game) {
            //hide the end game screen
            end_game_page.style.opacity = "0";
            //shrink the end game instructions
            end_game_content.style.transform = (
                "translate(-50%, -50%) scale(0.5)"
            );
            //reset the game
            start_game();
        }
    }
}

const leftButton = document.getElementById("moveLeft");
const rightButton = document.getElementById("moveRight");
const pauseButton = document.getElementById("pauseButton");

leftButton.addEventListener("mousedown", function() {
    left_button = true;
    paused = true;
    pause();
});

leftButton.addEventListener("mouseup", function() {
    left_button = false;
});

rightButton.addEventListener("mousedown", function() {
    right_button = true;
    paused = true;
    pause();
});

rightButton.addEventListener("mouseup", function() {
    right_button = false;
});

leftButton.addEventListener("touchstart", function(event) {
    event.preventDefault()
    left_button = true;
    paused = true;
    pause();
});

leftButton.addEventListener("touchend", function() {
    left_button = false;
});

rightButton.addEventListener("touchstart", function(event) {
    event.preventDefault()
    right_button = true;
    paused = true;
    pause();
});

rightButton.addEventListener("touchend", function() {
    right_button = false;
});

pauseButton.addEventListener("click", function() {
    pause();
});

window.addEventListener('resize', function(event) {
    //Set the width of the game interms of the board_cell property
    game_width = Math.ceil(window.innerWidth / EndlessMountain.board_cell);
    //Set the height of the game interms of the board_cell property
    game_height = Math.ceil(window.innerHeight / EndlessMountain.board_cell);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game_state = EndlessMountain.update_board();
}, true);

//A function that checks if keys have been pressed down and
//sets the indicator variables to true.
//listens for key press down:
document.addEventListener("keydown", function (e) {
    //defines e as window event for some browsers
    e = e || window.event;
    //if the key that is pressed down is the left arrow key
    if (e.key === "ArrowLeft") {
        //set left key indicator variable to true
        left_key = true;
    //else if the key that is pressed down is the right arrow key
    } else if (e.key === "ArrowRight") {
        //set right key indicator varaible to true
        right_key = true;
    }
});

//A function that checks if keys have been released
//and sets indicator varibales to false.
//listens for key release:
document.addEventListener("keyup", function (e) {
    //defines e as window event for some browsers
    e = e || window.event;
    //if the key that is released is the left arrow key
    if (e.key === "ArrowLeft") {
        //set left key indicator variable to false
        left_key = false;
    //else if the key that is released is the right arrow key
    } else if (e.key === "ArrowRight") {
    //set right key indicator variable to false
        right_key = false;
    //else if the key that is release is the space button
    } else if (e.key === " " || e.code === "Space") {
        //run the pause function
        pause();
    }
});

//A function that clears the canvas of all content
function clear_canvas() {
    //clear canvas between 0, 0, and the game width and heigth
    c.clearRect(
        0,
        0,
        game_width * EndlessMountain.board_cell,
        game_height * EndlessMountain.board_cell
    );
}

//A function used to draw rotated objects by rotating the canvas
// about the objects origin
function rotateObject(angle, translation_x, translation_y) {
    //translate draw coordinates
    c.translate(
        translation_x,
        translation_y
    );
    //rotate about new coordinates
    c.rotate(angle * (Math.PI / 180));
    //reset draw coordinates
    c.translate(
        -1 * (translation_x),
        -1 * (translation_y)
    );
}

//A function used to draw the player
function draw_player() {
    //create a face image
    let face = document.createElement("img");
    //define the face image src
    face.src = "assets/face.png";
    //create a beanie image
    let beanie = document.createElement("img");
    //define the beanie image src
    beanie.src = "assets/beanie.png";
    //set the fill style to orange
    c.fillStyle = "orange";
    //rotate the canvas about left ski pos
    rotateObject(
        ski_angle,
        game_state.player_x + EndlessMountain.board_cell / 6,
        game_state.player_y + EndlessMountain.board_cell * 3 / 2
    );
    //draw left ski on rotated canvs
    c.fillRect(
        game_state.player_x,
        game_state.player_y + EndlessMountain.board_cell,
        EndlessMountain.board_cell / 3,
        EndlessMountain.board_cell
    );
    //reset rotations
    c.setTransform(1, 0, 0, 1, 0, 0);
    //rotate the canvas about right ski pos
    rotateObject(
        ski_angle,
        game_state.player_x + EndlessMountain.board_cell * 2 / 3 +
        EndlessMountain.board_cell / 6,
        game_state.player_y + EndlessMountain.board_cell * 3 / 2
    );
    //draw right ski on rotated canvs
    c.fillRect(
        game_state.player_x + EndlessMountain.board_cell * 2 / 3,
        game_state.player_y + EndlessMountain.board_cell,
        EndlessMountain.board_cell / 3,
        EndlessMountain.board_cell
    );
    //reset rotations
    c.setTransform(1, 0, 0, 1, 0, 0);
    //set the fill style to black
    c.fillStyle = "black";
    //draw face
    c.drawImage(
        face,
        game_state.player_x,
        game_state.player_y,
        EndlessMountain.board_cell,
        EndlessMountain.board_cell / 2
    );
    //draw beanie
    c.drawImage(
        beanie,
        game_state.player_x,
        game_state.player_y - EndlessMountain.board_cell / 2,
        EndlessMountain.board_cell,
        EndlessMountain.board_cell / 2
    );
    //draw body
    c.fillRect(
        game_state.player_x,
        game_state.player_y + EndlessMountain.board_cell / 2,
        EndlessMountain.board_cell,
        EndlessMountain.board_cell / 2
    );
    //draw left leg
    c.fillRect(
        game_state.player_x,
        game_state.player_y + EndlessMountain.board_cell,
        EndlessMountain.board_cell / 3,
        EndlessMountain.board_cell / 2
    );
    //draw right leg
    c.fillRect(
        game_state.player_x + EndlessMountain.board_cell * 2 / 3,
        game_state.player_y + EndlessMountain.board_cell,
        EndlessMountain.board_cell / 3,
        EndlessMountain.board_cell / 2
    );
}

//A function used to draw the obstacles
function draw_obstacles() {
    //for all obstacles in game_state.obstacles: map
    game_state.obstacles.map(function (obstacle) {
        //if the obstacle is a tree
        if (obstacle.type === 1) {
            //create a tree image
            let tree = document.createElement("img");
            //define the tree image src
            tree.src = "assets/tree.png";
            //draw the tree
            c.drawImage(
                tree,
                obstacle.x,
                obstacle.y,
                EndlessMountain.Tree.width,
                EndlessMountain.Tree.height
            );
        }
        //if the obstacle is a rock
        if (obstacle.type === 2) {
            //create a rock image
            let rock = document.createElement("img");
            //define the rock image src
            rock.src = "assets/rock.png";
            //draw the rock
            c.drawImage(
                rock,
                obstacle.x,
                obstacle.y,
                EndlessMountain.Rock.width,
                EndlessMountain.Rock.height
            );
        }
    });
}

//A function used to move the player
function move_player() {
    //if both keys are active
    if (left_key && right_key) {
        //reset ski angle
        if (ski_angle > da) {
            ski_angle -= da;
        //reset ski angle
        } else if (ski_angle < -da) {
            ski_angle += da;
        //reset ski angle
        } else {
            ski_angle = 0;
        }
    //else if left key is active
    } else if (left_key || left_button) {
        //move the player left
        game_state = EndlessMountain.move_left(game_state);
        //if the ski angle is less than 30deg
        if (ski_angle < 30) {
            //add da to ski angle
            ski_angle += da;
        }
    //else if right key is active
    } else if (right_key || right_button) {
        //move the player right
        game_state = EndlessMountain.move_right(game_state);
        //if the ski angle is more than -30deg
        if (ski_angle > -30) {
            //minus da to ski angle
            ski_angle -= da;
        }
    } else {
        //reset ski angle
        if (ski_angle > da) {
            ski_angle -= da;
        //reset ski angle
        } else if (ski_angle < -da) {
            ski_angle += da;
        //reset ski angle
        } else {
            ski_angle = 0;
        }
    }
}

//function used to diplay score in custom svg font
function display_score(score) {
    //take score and seperate into digits
    let score_string = score.toString().split("");
    //get list of all currently displayed score digits
    let score_elements = document.getElementsByClassName("score_num");
    //if there arent enough score elements
    if (score_elements.length < score_string.length) {
        //loop through difference in number of score elements vs score digits
        EndlessMountain.range(0, score_string.length - score_elements.length).forEach(
            function () {
                //create a new digit element
                const score_element = document.createElement("img");
                //assign it a class name
                score_element.className = "score_num";
                //and add it to the front of score_display
                score_display.prepend(score_element);
            }
        );
    }
    //if there are too many score elements
    if (score_elements.length > score_string.length) {
        //loop through difference in number of score elements vs score digits
        EndlessMountain.range(0, score_elements.length - score_string.length).forEach(
            function (index) {
                //remove all unneccesary
                score_elements[index].remove();
            }
        );
    }
    //reset the list os score elements
    score_elements = document.getElementsByClassName("score_num");
    //for each digit of the score
    score_string.forEach(
        function (score_item, index) {
            //set the src to the relevant number
            score_elements[index].src = "assets/numbers/num_" +
            score_item + ".svg";
            //set the alt tag for accessibility
            score_elements[index].alt = (
                "a " + score_item + " digit of the score"
            );
        }
    );
}

//start animation
function animate() {
    //if the player has not died
    if (!game_state.end_game) {
        //loop animation with every frame rate
        window.requestAnimationFrame(animate);
    }
    //clear the canvas
    clear_canvas();
    //if the game is paused
    if (paused) {
        //draw the player
        draw_player();
        //draw each obstacle
        draw_obstacles();
    //if not paused
    } else {
        //if 1 game cell has passed
        if (trigger_obstacles % EndlessMountain.board_cell === 0) {
            //add more obstacles
            game_state = EndlessMountain.add_obstacles(
                EndlessMountain.create_obstacles(game_width),
                EndlessMountain.Tree.height,
                game_state
            );
            //set add obstacles indicator back to 0
            trigger_obstacles = 0;
            //update the score
            game_state = EndlessMountain.update_score(1, game_state);
            //display the new score
            display_score(game_state.score);
            //if score is divisible by 100
            if (game_state.score % 100 === 0) {
                //increase the speed of then game by 1
                game_state.dy += 1;
            }
        }
        console.log(game_state.dy);
        //add inital dy to the trigger obstacle indicator
        trigger_obstacles += intial_dy;
        //delete obstacles that have left the screen
        game_state = EndlessMountain.delete_obstacles(
            game_state,
            EndlessMountain.Tree.height
        );
        //add new obstacles
        game_state = EndlessMountain.update_obstacles(game_state);
        //move the player based on left and right keys
        move_player();
        //draw player
        draw_player();
        //draw each obstacle
        draw_obstacles();
        //check if there was a collision and set if game is ended or not
        game_state = EndlessMountain.game_is_ended(
            EndlessMountain.check_collision(game_state),
            game_state
        );
        //if game is ended
        if (game_state.end_game) {
            //call the pause function
            pause();
        }
    }
}

//a function used to start the game or reset the game
const start_game = function () {
    //defines the board width and height based on the board_cell
    game_state = EndlessMountain.create_board(
        game_width * EndlessMountain.board_cell,
        game_height * EndlessMountain.board_cell
    );
    //set the canvas height to pixel width*game_height
    canvas.height = EndlessMountain.board_cell * game_height;
    //set the canvas width to pixel width*game_width
    canvas.width = EndlessMountain.board_cell * game_width;
    //sets the body background to green so
    //that the canvas is clear on page resize
    document.body.style.background = "#008d36";
    //display the score
    display_score(game_state.score);
    //defines the players x, y based on width,
    //height and board size
    game_state = EndlessMountain.set_player_position(
        game_state
    );
    //get a random list of obstacles and add them to the game state
    game_state = EndlessMountain.add_obstacles(
        EndlessMountain.create_obstacles(game_width),
        4 * EndlessMountain.board_cell,
        game_state
    );
    //add inital obstacles to canvas
    EndlessMountain.range(0, Math.floor(game_height / 2) - 1).forEach(function (index) {
        game_state = EndlessMountain.add_obstacles(
            EndlessMountain.create_obstacles(game_width),
            -1 * EndlessMountain.board_cell * index,
            game_state
        );
    });
    //reverses the order of the obstacles so they print correctly
    game_state.obstacles.reverse();
    //begin animation
    animate();
};

//start the game
start_game();