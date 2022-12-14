export const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

export const getClosestNode = (unvisitedNodes, name) => {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (name === "a") {
      if (
        !currentClosest ||
        currentClosest.distance + currentClosest.f >
          unvisitedNodes[i].distance + unvisitedNodes[i].f
      ) {
        currentClosest = unvisitedNodes[i];
        index = i;
      } else if (
        currentClosest.distance + currentClosest.f ===
        unvisitedNodes[i].distance + unvisitedNodes[i].f
      ) {
        if (currentClosest.f > unvisitedNodes[i].f) {
          currentClosest = unvisitedNodes[i];
          index = i;
        }
      }
    } else {
      if (
        !currentClosest ||
        currentClosest.distance > unvisitedNodes[i].distance
      ) {
        currentClosest = unvisitedNodes[i];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
};

export const updateUnvisitedNeighbors = (node, grid, name, endNode = null) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  if (name === "d") {
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  } else {
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.f =
        // neighbor.distance +
        Math.abs(neighbor.row - endNode.row) +
        Math.abs(neighbor.col - endNode.col);
      neighbor.previousNode = node;
    }
  }
};

export const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const shortestPath = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
