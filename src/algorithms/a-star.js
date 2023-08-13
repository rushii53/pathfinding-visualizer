export const aStar = (graph, startNode, endNode) => {
  const calculateHeuristic = (node, endNode) => {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
  };

  startNode.distance = 0;
  startNode.heuristicDistance = calculateHeuristic(startNode, endNode);
  let visitedNodesInOrder = [];
  let unvisitedNodes = [];
  let isFound = false;
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length) {
    unvisitedNodes = sortNodesByDistanceAndHeuristic(unvisitedNodes);
    const currentNode = unvisitedNodes.shift();

    if (currentNode.isVisited || currentNode.isWall) continue;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      isFound = true;
      return {
        isFound,
        visitedNodesInOrder,
      };
    }

    const unvisitedNeighbourNodes = getUnvisitedNeighborNodes(graph, currentNode);
    for (const neighbour of unvisitedNeighbourNodes) {
      neighbour.heuristicDistance = calculateHeuristic(neighbour, endNode);
      const tentativeDistanceToNeighbour =
        currentNode.distance + (neighbour.isWeighted ? 5 : 1);

      if (!neighbour.distance || tentativeDistanceToNeighbour < neighbour.distance) {
        neighbour.distance = tentativeDistanceToNeighbour;
        neighbour.previousNode = currentNode;
      }
      unvisitedNodes.push(neighbour);
    }
  }

  return {
    isFound,
    visitedNodesInOrder,
  };
};

const sortNodesByDistanceAndHeuristic = (unvisitedNodes) => {
  return unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance + nodeA.heuristicDistance - (nodeB.distance + nodeB.heuristicDistance)
  );
};

const getUnvisitedNeighborNodes = (graph, currentNode) => {
  const { row, col } = currentNode;
  const unvisitedNeighbourNodes = [];
  if (row - 1 >= 0) unvisitedNeighbourNodes.push(graph[row - 1][col]);
  if (row + 1 < graph.length) unvisitedNeighbourNodes.push(graph[row + 1][col]);
  if (col - 1 >= 0) unvisitedNeighbourNodes.push(graph[row][col - 1]);
  if (col + 1 < graph[0].length) unvisitedNeighbourNodes.push(graph[row][col + 1]);
  return unvisitedNeighbourNodes.filter((node) => !node.isVisited);
};

