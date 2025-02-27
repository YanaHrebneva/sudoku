module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize = 3;

  const findEmpty = (matrix) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 0) {
          return [r, c];
        }
      }
    }
    return null;
  }

  const validate = (num, pos, matrix) => {
    const [r, c] = pos;

    for (let i = 0; i < size; i++) {
      if (matrix[i][c] === num && i !== r) {
        return false;
      }
    }

    for (let i = 0; i < size; i++) {
      if (matrix[r][i] === num && i !== c) {
        return false;
      }
    }

    const boxRow = Math.floor(r / boxSize) * boxSize;
    const boxCol = Math.floor(c / boxSize) * boxSize;

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i !== r && j !== c) {
          return false;
        }
      }
    }
    return true;
  }

  const solve = () => {
    const currPos = findEmpty(matrix);

    if (!currPos) return true; 

    for (let i = 1; i <= size; i++) {
      const isValid = validate(i, currPos, matrix);

      if (isValid) {
        const [x, y] = currPos;
        matrix[x][y] = i;

        if (solve()) return true;

        matrix[x][y] = 0;
      }
    }
    return false;
  }
  solve();
  return matrix;
}
