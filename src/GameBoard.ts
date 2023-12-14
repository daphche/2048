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

export enum Result {
    FAILURE,
    SUCCESS,
    ONGOING
}

export enum Direction {
    NONE,
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

    // i need to add logic for generating random values not just using 2 sa a value
    #getRandomEmptyTileIndex(): number {
        const availableIndices: Array<number> = this.#boardState
            .map((tile,index) => tile === 0 ? index : null)
            .filter(tileIndex => tileIndex !== null);

        if(availableIndices.length === 0) {
            return -1;
        }

        const x: number = Math.floor(Math.random() * availableIndices.length);
        return x;
    }

    getBoardState(): string {
        let board = [];
        for(let i = 0; i < boardDimension*boardDimension; i=i+boardDimension){
            let arr = this.#boardState.slice(i, i+boardDimension);
            board.push(arr.join(" "));
        }
        return board.join('\n');
    }

    hasWon(): boolean {
        return this.#boardState.some(value => value === 2048);
    }

    calculateNextState(direction: Direction): Result {
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
                this.#boardState = getMatrixFromColumnsDown(calculatedArrays, boardDimension);
                break;
            }
            default:
                break;
        }


        if(this.hasWon()) {
            return Result.SUCCESS;
        }
        // add another number
        const x = this.#getRandomEmptyTileIndex();
        if(x === -1) {
            // GAME OVER
            return Result.FAILURE;
        }
        this.#boardState[x] = 2;
        return Result.ONGOING;
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
            if(arr[inputArrIndex] === 0) {
                // do nothing
            }
            else if((inputArrIndex < boardDimension - 1) && (arr[inputArrIndex] === arr[inputArrIndex+1])){
                newArr[newArrIndex] = arr[inputArrIndex]*2;
                newArrIndex++;
                inputArrIndex++;
            } else {
                newArr[newArrIndex] = arr[inputArrIndex];
                newArrIndex++;
            }
        }

        return newArr;
    }
}
