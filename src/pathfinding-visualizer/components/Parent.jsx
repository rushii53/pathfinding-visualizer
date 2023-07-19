import { useState } from "react";
import { breadthFirst } from "../../algorithms/breadth-first";
import { depthfirst } from "../../algorithms/depth-first";
import { dijkstra, getShortestPath } from "../../algorithms/dijkstra-algorithm";
import { useBoardContext } from "../contexts/BoardContext";
import { Body } from "./Body";
import { Dashboard } from "./Dashboard";
import { aStar } from "../../algorithms/a-star";

export const Parent = () => {
  const { graph, setGraph, startNode, endNode ,setRunning} = useBoardContext();
  const [selectedAlgo, setAlgo] = useState("Algorithms");
  const [aboutAlgo, setAboutAlgo] = useState(
    "Select an algorithm and visualize it!"
  );

  //this function will animate all the visited nodes
  const animateAllPaths = (visitedNodes) => {
    return new Promise((resolve) => {
      for (let index = 0; index < visitedNodes.length; index++) {
        const node = visitedNodes[index];
        setTimeout(() => {
          const animate = [...graph];
          animate[node.row][node.col].isPath = true;
          setGraph(animate);
          if (index === visitedNodes.length - 1) {
            resolve();
          }
        }, 15 * index);
      }
    });
  };

  //this function will animate the shortest path
  const animateShortestPath = (shortesPath) => {
    return new Promise((resolve) => {
      for (let index = 0; index < shortesPath.length; index++) {
        const node = shortesPath[index];
        setTimeout(() => {
          const animate = [...graph];
          animate[node.row][node.col].isShortestPath = true;
          setGraph(animate);
          if (index == shortesPath.length - 1) resolve();
        }, 50 * index);
      }
    });
  };

 
  const visualizeAlgorithms = async (algorithm) => {
    setRunning(true);
    let isFound,visitedNodesInOrder;
    switch (algorithm) {
      case "Dijkstra":
        const dijkstraResult = dijkstra(graph, graph[startNode.row][startNode.col]);
        isFound=dijkstraResult.isFound;
        visitedNodesInOrder=dijkstraResult.visitedNodesInOrder;
        break;
      case "AStar":
        const AStarResult=aStar(graph,graph[startNode.row][startNode.col],graph[endNode.row][endNode.col]);
        isFound=AStarResult.isFound;
        visitedNodesInOrder=AStarResult.visitedNodesInOrder;
        break;
      case "BFS":
        const BfsResult=breadthFirst(graph,graph[startNode.row][startNode.col]);
        isFound=BfsResult.isFound;
        visitedNodesInOrder=BfsResult.visitedNodesInOrder;
        break;
      case "DFS":
        const DfsResult=depthfirst(graph, graph[startNode.row][startNode.col]);
        isFound=DfsResult.isFound;
        visitedNodesInOrder=DfsResult.visitedNodesInOrder;
        break;
      default:
        break;
    }


    
    //animate all the visited nodes and the shortest path
    await animateAllPaths(visitedNodesInOrder);
    //if shortest path found then
    if(isFound){
      const shortesPath = getShortestPath(graph[endNode.row][endNode.col]);
      await animateShortestPath(shortesPath);
    }
    setRunning(false);
  };

  return (
    <>
      <Dashboard
        selectedAlgo={selectedAlgo}
        setAboutAlgo={setAboutAlgo}
        setAlgo={setAlgo}
        visualizeAlgorithms={visualizeAlgorithms}
      />
      <Body aboutAlgo={aboutAlgo} />
    </>
  );
};
