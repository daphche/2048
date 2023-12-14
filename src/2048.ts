import { GameBoard, Direction } from "./GameBoard.js";

function runGame() {
	console.log("starting 2048 game");

	const game = new GameBoard();
	game.setBoardForDebug([0,4,4,4,4,4,4,4,4,0,4,2,0,4,2,2]);
	game.calculateNextState(Direction.LEFT);
	console.log(game.getBoardState());

	game.setBoardForDebug([0,4,4,4,4,4,4,4,4,0,4,2,0,4,2,2]);
	game.calculateNextState(Direction.RIGHT);
	console.log(game.getBoardState());

	game.setBoardForDebug([0,4,4,4,4,4,4,4,4,0,4,2,0,4,2,2]);
	game.calculateNextState(Direction.DOWN);
	console.log(game.getBoardState());

	game.setBoardForDebug([0,4,4,4,4,4,4,4,4,0,4,2,0,4,2,2]);
	game.calculateNextState(Direction.UP);
	console.log(game.getBoardState());

}

runGame();