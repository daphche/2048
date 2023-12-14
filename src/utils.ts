export function getMatrixRows(matrixAsArray, dimension): Array<Array<number>> {
    let arrays = new Array<Array<number>>(dimension);

    for(let i = 0; i < dimension; i++) {
        let arr = new Array<number>(dimension);
        for (let j = 0; j < dimension; j++) {
            arr[j] = matrixAsArray[i*dimension+j];
        }
        arrays[i] = arr;
    }
    return arrays;
}

export function getMatrixColumns(matrixAsArray, dimension): Array<Array<number>> {
    let arrays = new Array<Array<number>>(dimension);

    for(let i = 0; i < dimension; i++) {
        let arr = new Array<number>(dimension);
        for (let j = 0; j < dimension; j++) {
            arr[j] = matrixAsArray[i+dimension*j];
        }
        arrays[i] = arr;
    }
    return arrays;
}

export function getRowsLeft(matrixAsArray, dimension): Array<Array<number>> {
    return getMatrixRows(matrixAsArray, dimension);
}

export function getRowsRight(matrixAsArray, dimension): Array<Array<number>> {
    let arrays = getMatrixRows(matrixAsArray, dimension);
    let reversed = arrays.map(arr => arr.reverse());
    return reversed;
}

export function getColumnsUp(matrixAsArray, dimension): Array<Array<number>> {
    return getMatrixColumns(matrixAsArray, dimension);
}

export function getColumnsDown(matrixAsArray, dimension): Array<Array<number>> {
    let arrays = getMatrixColumns(matrixAsArray, dimension);
    let reversed = arrays.map(arr => arr.reverse());
    return reversed;
}

export function getMatrixFromRowsLeft(arrays: Array<Array<number>>): Array<number> {
    let matrix = [];
    arrays.forEach(arr => {matrix.push(...arr)});
    return matrix;
}

export function getMatrixFromRowsRight(arrays: Array<Array<number>>): Array<number> {
    let matrix = [];
    arrays.forEach(arr => {matrix.push(...arr.reverse())});
    return matrix;
}

export function getMatrixFromColumnsUp(arrays: Array<Array<number>>, dimension: number): Array<number> {
    let matrix: Array<number> = new Array<number>(dimension * dimension);
    for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++) {
            matrix[i*dimension + j] = arrays[j][i];
        }
    }
    return matrix;
}

export function getMatrixFromColumnsDown(arrays: Array<Array<number>>, dimension: number): Array<number> {
    const reversed = arrays.map(arr => arr.reverse());
    return getMatrixFromColumnsUp(reversed, dimension);
}