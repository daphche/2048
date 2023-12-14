import {
    getColumnsDown,
    getColumnsUp, getMatrixFromColumnsDown,
    getMatrixFromColumnsUp,
    getMatrixFromRowsLeft, getMatrixFromRowsRight,
    getRowsLeft,
    getRowsRight
} from "./utils.js";

export const boardDimension: number = 4;
const nTilesToFillAtStart: number = 2;

export enum Direction {
    UP,
    DOWN,
    RIGHT,
    LEFT
}

export class GameBoard {
    #boardState: Array<number>;

    constructor() {
    }

    setBoardForDebug(board: Array<number>) {
        this.#boardState = board;
    }

    initNewBoard(): void {
        this.#boardState = new Array<number>(boardDimension * boardDimension).fill(0);

        // generate 2 random tile values
        for(let i = 0; i < nTilesToFillAtStart; i++) {
            const x = this.#getRandomEmptyTileIndex();
            this.#boardState[x] = 2;
        }
    }

    #getRandomEmptyTileIndex(): number {
        const availableIndices: Array<number> = this.#boardState
            .map((tile,index) => tile === null ? index : null)
            .filter(tileIndex => tileIndex !== null);

        const x: number = Math.floor(Math.random() * availableIndices.length);
        return x;
    }

    getBoardState(): Array<number> {
        return this.#boardState;
    }

    calculateNextState(direction: Direction) {
        switch(direction) {
            case Direction.LEFT: {
                const arrays = getRowsLeft(this.#boardState, boardDimension);
                const calculatedArrays = arrays.map(arr => this.resolveArray(arr));
                this.#boardState = getMatrixFromRowsLeft(calculatedArrays);
                this.updateBoardFromArraysLeft(calculatedArrays);
                break;
            }
            case Direction.RIGHT: {
                const arrays = getRowsRight(this.#boardState, boardDimension);
                const calculatedArrays = arrays.map(arr => this.resolveArray(arr));
                this.#boardState = getMatrixFromRowsRight(calculatedArrays);
                break;
            }
            case Direction.UP: {
                const arrays = getColumnsUp(this.#boardState, boardDimension);
                const calculatedArrays = arrays.map(arr => this.resolveArray(arr));
                this.#boardState = getMatrixFromColumnsUp(calculatedArrays, boardDimension);
                break;
            }
            case Direction.DOWN: {
                const arrays = getColumnsDown(this.#boardState, boardDimension);
                const calculatedArrays = arrays.map(arr => this.resolveArray(arr));
                //this.updateBoardFromArraysDown(calculatedArrays);
                this.#boardState = getMatrixFromColumnsDown(calculatedArrays, boardDimension);
                break;
            }
            default:
                break;
        }
    }

    updateBoardFromArraysLeft(arrays: Array<Array<number>>): void {
        this.#boardState = [];
        arrays.forEach(arr => {this.#boardState.push(...arr)});
    }

    updateBoardFromArraysRight(arrays: Array<Array<number>>): void {
        this.#boardState = [];
        arrays.forEach(arr => {
            this.#boardState.push(...arr.reverse())
        });
    }

    resolveArray(arr: Array<number>): Array<number> {
        let newArr: Array<number> = new Array<number>(4).fill(0);
        let newArrIndex: number = 0;

        for(let inputArrIndex = 0; inputArrIndex < boardDimension; inputArrIndex++) {
            console.log(`inputArrIndex: ${inputArrIndex}`);
            if(arr[inputArrIndex] === 0) {
                console.log(`inputArrIndex = ${inputArrIndex}; it's 0, skipping.`);
            }
            else if((inputArrIndex < boardDimension - 1) && (arr[inputArrIndex] === arr[inputArrIndex+1])){
                console.log(`inputArrIndex = ${inputArrIndex}; adding.`);
                newArr[newArrIndex] = arr[inputArrIndex]*2;
                newArrIndex++;
                inputArrIndex++;
            } else {
                console.log(`inputArrIndex = ${inputArrIndex}; leaving as is.`);
                newArr[newArrIndex] = arr[inputArrIndex];
                newArrIndex++;
            }
        }

        return newArr;
    }
}
