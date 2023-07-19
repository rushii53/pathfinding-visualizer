export const breadthFirst=(graph,startNode)=>{
    const visitedNodesInOrder=[];
    const unvisitedNodes=[];
    let isFound=false;
    unvisitedNodes.push(startNode);
    while(unvisitedNodes.length>0){
        let currentNode=unvisitedNodes.shift();
        if (currentNode.isWall || currentNode.isVisited) continue;
        currentNode.isVisited=true;
        visitedNodesInOrder.push(currentNode);
        if(currentNode.isEndNode){
            isFound=true;
            return {
                isFound,
                visitedNodesInOrder
            }
        }
        let neigbourNodes=getNegibourNodes(graph,currentNode);
        for(const neigbour of neigbourNodes){
            neigbour.distance=currentNode.distance+1;
            neigbour.previousNode=currentNode;
            unvisitedNodes.push(neigbour);
        }
    }
    return {isFound,visitedNodesInOrder};
}

const getNegibourNodes=(graph,node)=>{
    const {row,col}=node;
    let neighborNodes=[];
    if(row>0 && !graph[row-1][col].isWall){
        neighborNodes.push(graph[row-1][col]);
    }
    if(col<graph[0].length-1 && !graph[row][col+1].isWall){
        neighborNodes.push(graph[row][col+1]);
    }
    if(row<graph.length-1 && !graph[row+1][col].isWall){
        neighborNodes.push(graph[row+1][col]);
    }
    if(col>0 && !graph[row][col-1].isWall){
        neighborNodes.push(graph[row][col-1]);
    }
    return  neighborNodes.filter((node)=>!node.isVisited)
}