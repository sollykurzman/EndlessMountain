import EndlessMountain from "../EndlessMountain.js";
import R from "../ramda.js";



const obstacles = [0, 0, 0, 1, 0, 1];
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
            console.log(game_state.obstacles[obstacle_count]);
            if (obstacle !== game_state.obstacles[obstacle_count].type) {
                console.log(
                    "Some/all obstacles have an invalid obstacle type"
                );
            }
            if (
                index * EndlessMountain.board_cell !==
                game_state.obstacles[obstacle_count].x
            ) {
                console.log(
                    "Some/all obstacles have an invalid obstacle type"
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

