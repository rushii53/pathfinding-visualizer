// export const aStar=(graph,startNode,endNode)=>{
//     startNode.distance=0;
//     let visitedNodesInOrder=[];
//     let unvisitedNodes=[];
//     let heuristicDistance=null;
//     unvisitedNodes.push(startNode);
//     while(unvisitedNodes.length){
//         unvisitedNodes=sortNodeByHeuristicDistance(unvisitedNodes);
//         const currentNode=unvisitedNodes.shift();
//         if (currentNode.isWall || currentNode.isVisited) continue;
//         currentNode.isVisited=true;
//         visitedNodesInOrder.push(currentNode);
//         if(currentNode.isEndNode)
//             return visitedNodesInOrder;
//         let unvisitedNeighbourNodes=getNeighborNodes(graph,currentNode);
//         for(const neigbour of unvisitedNeighbourNodes){
//             // heuristicDistance = Math.sqrt(Math.pow(endNode.row - neigbour.row, 2) + Math.pow(endNode.col - neigbour.col, 2));
//             heuristicDistance=Math.abs(parseInt(endNode.row)-parseInt(neigbour.row))+Math.abs(parseInt(endNode.col)-parseInt(neigbour.col));
//             neigbour.heuristicDistance=heuristicDistance;
//             if(neigbour.isWeighted)
//                 neigbour.distance=currentNode.distance+5;
//             else    
//                 neigbour.distance=currentNode.distance+1;
//             neigbour.previousNode=currentNode;
//             unvisitedNodes.push(neigbour);
//         }
//     }
//     return visitedNodesInOrder;
// }
// const sortNodeByHeuristicDistance=(unvisitedNodes)=>{
//     return unvisitedNodes.sort((nodeA,nodeB)=>nodeA.heuristicDistance-nodeB.heuristicDistance);
//  }
// const getNeighborNodes=(graph,currentNode)=>{
//     const {row,col}=currentNode;
//     const unvisitedNeighbourNodes=[];
//     if(row-1>=0) unvisitedNeighbourNodes.push(graph[row-1][col]);
//     if(row+1<graph.length) unvisitedNeighbourNodes.push(graph[row+1][col]);
//     if(col-1>=0) unvisitedNeighbourNodes.push(graph[row][col-1]);
//     if(col+1<graph[0].length) unvisitedNeighbourNodes.push(graph[row][col+1]);
//     return unvisitedNeighbourNodes.filter((node)=>!node.isVisited)
// }

export const aStar = (graph, startNode, endNode) => {
    startNode.distance = 0;
    let visitedNodesInOrder = [];
    let unvisitedNodes = [];
    let heuristicDistance = null;
    unvisitedNodes.push(startNode);
  
    while (unvisitedNodes.length) {
      unvisitedNodes = sortNodeByHeuristicDistance(unvisitedNodes);
      const currentNode = unvisitedNodes.shift();
      if (currentNode.isWall || currentNode.isVisited) continue;
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode.isEndNode) {
        return getPath(currentNode);
      }
  
      let unvisitedNeighbourNodes = getNeighborNodes(graph, currentNode);
      for (const neighbour of unvisitedNeighbourNodes) {
        heuristicDistance = Math.abs(parseInt(endNode.row) - parseInt(neighbour.row)) + Math.abs(parseInt(endNode.col) - parseInt(neighbour.col));
        neighbour.heuristicDistance = heuristicDistance;
  
        let distanceToNeighbour = currentNode.distance + (neighbour.isWeighted ? 5 : 1);
        if (!neighbour.distance || distanceToNeighbour < neighbour.distance) {
          neighbour.distance = distanceToNeighbour;
          neighbour.previousNode = currentNode;
        }
        unvisitedNodes.push(neighbour);
      }
    }
  
    return visitedNodesInOrder;
  };
  
  const sortNodeByHeuristicDistance = (unvisitedNodes) => {
    return unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance + nodeA.heuristicDistance - (nodeB.distance + nodeB.heuristicDistance));
  };
  
  const getNeighborNodes = (graph, currentNode) => {
    const { row, col } = currentNode;
    const unvisitedNeighbourNodes = [];
    if (row - 1 >= 0) unvisitedNeighbourNodes.push(graph[row - 1][col]);
    if (row + 1 < graph.length) unvisitedNeighbourNodes.push(graph[row + 1][col]);
    if (col - 1 >= 0) unvisitedNeighbourNodes.push(graph[row][col - 1]);
    if (col + 1 < graph[0].length) unvisitedNeighbourNodes.push(graph[row][col + 1]);
    return unvisitedNeighbourNodes.filter((node) => !node.isVisited);
  };
  
  const getPath = (endNode) => {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return path;
  };
  