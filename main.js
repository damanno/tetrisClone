const GAME_WIDTH = 600;
const GAME_HEIGTH = 400;
const fps = 30;

var canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let lastTime = 0;

var game = new Game();
var i = 0;
let timesPerSecond = 0;

//
game.drawScreen(ctx);

function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timesPerSecond++;
    //if (timesPerSecond % 10 == 0) {
    if (timesPerSecond % 30 == 0) {
        i++;
        //desenha peça
        game.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
} 
//ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGTH);

gameLoop();