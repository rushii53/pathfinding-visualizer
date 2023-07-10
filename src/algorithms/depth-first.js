export const depthfirst=(graph,startNode)=>{
    let visitedNodesInOrder=[]
    startNode.distance=0;
    visitedNodesInOrder.push(startNode);
    dfs(graph,startNode,visitedNodesInOrder);
    return visitedNodesInOrder;
}

const dfs=(graph,currentNode,visitedNodesInOrder)=>{
    if(currentNode.isEndNode){
        return true;
    }
    let neighborNodes=getNeighborNodes(graph,currentNode);
    for(const neigbour of neighborNodes){
        neigbour.previousNode=currentNode;
        neigbour.isVisited=true;
        neigbour.distance=currentNode.distance+1;
        visitedNodesInOrder.push(neigbour);
        if(dfs(graph,neigbour,visitedNodesInOrder))
            return true;
    }
}

const getNeighborNodes=(graph,currentNode)=>{
    const {row,col}=currentNode;
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
    
    return neighborNodes.filter((node)=>!node.isVisited);
}