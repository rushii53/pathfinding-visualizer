export const dijkstra=(graph,startNode)=>{
    startNode.distance=0;
    let unvisitedNodes=[];
    const visitedNodesInOrder=[];
    unvisitedNodes.push(startNode);
    while(unvisitedNodes.length){
        unvisitedNodes=sortNodeByDistance(unvisitedNodes);
        let currentNode=unvisitedNodes.shift();
        if (currentNode.isWall || currentNode.isVisited) continue;
        currentNode.isVisited=true;
        visitedNodesInOrder.push(currentNode);
        if(currentNode.isEndNode) return visitedNodesInOrder;
        const unvisitedNeighbourNodes=getUnvisitedNeighbourNode(graph,currentNode);
        for(const neighbour of unvisitedNeighbourNodes){
            if(neighbour.isWeighted){
                neighbour.distance=currentNode.distance+10;
            }
            else{
                neighbour.distance=currentNode.distance+1;
            }
            neighbour.previousNode=currentNode;
            unvisitedNodes.push(neighbour);
        }
    }
    return visitedNodesInOrder;
}

const sortNodeByDistance=(unvisitedNodes)=>{
   return unvisitedNodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}

const getUnvisitedNeighbourNode=(graph,node)=>{
    const {row,col} =node;  
    const unvisitedNeighbourNodes=[];
    if(row-1>=0) unvisitedNeighbourNodes.push(graph[row-1][col]);
    if(row+1<graph.length) unvisitedNeighbourNodes.push(graph[row+1][col]);
    if(col-1>=0) unvisitedNeighbourNodes.push(graph[row][col-1]);
    if(col+1<graph[0].length) unvisitedNeighbourNodes.push(graph[row][col+1]);
    return unvisitedNeighbourNodes.filter((node)=>!node.isVisited)
}

export const getShortestPath=(endNode)=>{
    const shortestPath=[];
    let currentNode=endNode;
    while(currentNode!=null){
        shortestPath.push(currentNode);
        currentNode=currentNode.previousNode;
    }
   return shortestPath.reverse();
}