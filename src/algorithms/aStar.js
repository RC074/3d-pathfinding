import {
  updateUnvisitedNeighbors,
  getAllNodes,
  getClosestNode,
} from "./helper";

export const aStar = (grid, startNode, endNode) => {
  const visitedNodesInOrder = [];
  startNode.f = 0;
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    // sortNodesByF(unvisitedNodes);
    // console.log(unvisitedNodes);
    let closestNode = getClosestNode(unvisitedNodes, "a");

    if (closestNode.isWall) continue;
    if (closestNode.f === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === endNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid, "a", endNode);
  }
};
