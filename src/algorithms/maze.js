export const recursiveDivisionMaze = (
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls,
  visitedNodesInOrder
) => {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }

  const convertToWall = (node) => {
    if (!node.isStart && !node.isEnd) {
      node.isWall = true;
      visitedNodesInOrder.push(node);
    }
  };

  if (!surroundingWalls) {
    let i, j;
    //First row
    for (j = 0; j < grid[0].length; j++) {
      i = 0;
      convertToWall(grid[i][j]);
    }
    //Last row
    for (j = 0; j < grid[0].length; j++) {
      i = grid.length - 1;
      convertToWall(grid[i][j]);
    }
    //First column
    for (i = 1; i < grid.length - 1; i++) {
      j = 0;
      convertToWall(grid[i][j]);
    }
    //Last column
    for (i = 1; i < grid.length - 1; i++) {
      j = grid[0].length - 1;
      convertToWall(grid[i][j]);
    }
    surroundingWalls = true;
  }

  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    let i = currentRow,
      j;
    for (j = colStart - 1; j <= colEnd + 1; j++) {
      if (j !== colRandom) {
        convertToWall(grid[i][j]);
      }
    }

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        visitedNodesInOrder
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        visitedNodesInOrder
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        visitedNodesInOrder
      );
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        visitedNodesInOrder
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    let i,
      j = currentCol;
    for (i = rowStart - 1; i <= rowEnd + 1; i++) {
      if (i !== rowRandom) {
        convertToWall(grid[i][j]);
      }
    }
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        visitedNodesInOrder
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        visitedNodesInOrder
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        visitedNodesInOrder
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        visitedNodesInOrder
      );
    }
  }
};
