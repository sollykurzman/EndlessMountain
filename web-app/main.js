import R from "./ramda.js";
import EndlessMountain from "./EndlessMountain.js";

//Set the width of the game interms of the board_cell property
const game_width = Math.ceil(window.innerWidth / EndlessMountain.board_cell);
//Set the height of the game interms of the board_cell property
const game_height = Math.ceil(window.innerHeight / EndlessMountain.board_cell);
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
        game_title.style.width = "50vw";
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
        game_title.style.width = "25vw";
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
    } else if (left_key) {
        //move the player left
        game_state = EndlessMountain.move_left(game_state);
        //if the ski angle is less than 30deg
        if (ski_angle < 30) {
            //add da to ski angle
            ski_angle += da;
        }
    //else if right key is active
    } else if (right_key) {
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
        R.range(0, score_string.length - score_elements.length).forEach(
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
        R.range(0, score_elements.length - score_string.length).forEach(
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
    R.range(0, Math.floor(game_height / 2) - 1).forEach(function (index) {
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