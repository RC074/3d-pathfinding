import {
  updateUnvisitedNeighbors,
  getAllNodes,
  getUnvisitedNeighbors,
  getClosestNode,
} from "./helper";

export const dijsktra = (grid, startNode, endNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    let closestNode = getClosestNode(unvisitedNodes, "d");
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, "d");
  }
};
