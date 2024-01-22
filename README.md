[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uu0DCd-8)
# Computing 2 Coursework Submission.
**CID**: 02097287

This game is called Endless Mountain, you are a skiier and you must use the left and right keys to dodge the trees.

The turn aspect of the game is implemented with each frame refresh/repaint of the HTML Canvas, in each turn the player can play left, right or nothing.

Board based is achieved through a coordinates system of player and obstacle postions as an x y position and collisions are calculated using this and the player and obstacle widths.

Current TODOs are as follows:
- Represent the state of the game with one game_state variable that stores players position, obstacles, etc etc.
- Add different obstacles and implement specific collision functions depending on the obstacle.
- make the tree density dependent on screenwidth so is playable on all screen widths.
- make tree start height dependent on the height of the page so playable on all screen widths.
- make everything either camel case or snake case.
- make the checkCollision function in EndlessMountain.js end properly once a collision is detected. 
- Write unit tests.
- Add trail behind the skiier.
- Add title page.
- Implement 2 player.
- Implement sever side high score storage.
- Adjust speed depending on amount of turn.
- Make body turn with skis.
