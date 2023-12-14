import { Direction, GameBoard, Result } from "./GameBoard.js";
import { createInterface } from 'readline';
function getUserInput(question, callback) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(question, (userInput) => {
        rl.close();
        callback(userInput);
    });
}
const game = new GameBoard();
function askNext() {
    getUserInput("Enter the next move (W/A/S/D):\n", myCallback);
}
;
function myCallback(userInput) {
    let direction = Direction.NONE;
    switch (userInput[0]) {
        case "w":
            direction = Direction.UP;
            break;
        case "a":
            direction = Direction.LEFT;
            break;
        case "s":
            direction = Direction.DOWN;
            break;
        case "d":
            direction = Direction.RIGHT;
            break;
    }
    if (direction !== Direction.NONE) {
        const rc = game.calculateNextState(direction);
        if (rc === Result.SUCCESS || rc === Result.FAILURE) {
            console.log(`GAME OVER! you have ${rc === Result.SUCCESS ? "won!" : "lost..."}`);
            process.exit(0);
        }
        console.clear();
        console.log(game.getBoardState());
        askNext();
    }
}
function runGame() {
    game.initNewBoard();
    console.log(game.getBoardState());
    askNext();
}
runGame();
