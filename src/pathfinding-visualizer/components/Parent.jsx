import { useState } from "react";
import { breadthFirst } from "../../algorithms/breadth-first";
import { depthfirst } from "../../algorithms/depth-first";
import { dijkstra, getShortestPath } from "../../algorithms/dijkstra-algorithm";
import { useBoardContext } from "../contexts/BoardContext";
import { Body } from "./Body";
import { Dashboard } from "./Dashboard";

export const Parent = () => {
  const { graph, setGraph, startNode, endNode } = useBoardContext();
  const [selectedAlgo, setAlgo] = useState("Algorithms");
  const [aboutAlgo,setAboutAlgo]=useState('Select an algorithm and visualize it!');

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
    for (let index = 0; index < shortesPath.length; index++) {
      const node = shortesPath[index];
      setTimeout(() => {
        const animate = [...graph];
        animate[node.row][node.col].isShortestPath = true;
        setGraph(animate);
      }, 50 * index);
    }
  };

  //function to visualize Dijkstra's algorithm
  const visualizeDijkstra = async () => {
    const visitedNodes = dijkstra(graph, graph[startNode.row][startNode.col]);
    await animateAllPaths(visitedNodes);
    const shortesPath = getShortestPath(graph[endNode.row][endNode.col]);
    animateShortestPath(shortesPath);
  };

  //function to visualize depth-first search algorithm
  const visualizeDfs = async () => {
    const visitedNodes = depthfirst(graph, graph[startNode.row][startNode.col]);
    await animateAllPaths(visitedNodes);
    animateShortestPath(visitedNodes);
  };

  //function to visualize depth-first search algorithm
  const visualizeBfs = async () => {
    const visitedNodes = breadthFirst(
      graph,
      graph[startNode.row][startNode.col]
    );
    await animateAllPaths(visitedNodes);
    const shortesPath = getShortestPath(graph[endNode.row][endNode.col]);
    animateShortestPath(shortesPath);
  };

  const visualizeAlgorithms = async (algorithm) => {
    switch (algorithm) {
      case "Dijkstra":
        visualizeDijkstra();
        break;
      case "BFS":
        visualizeBfs();
        break;
      case "DFS":
        visualizeDfs();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dashboard selectedAlgo={selectedAlgo} setAboutAlgo={setAboutAlgo} setAlgo={setAlgo} visualizeAlgorithms={visualizeAlgorithms} />
      <Body aboutAlgo={aboutAlgo} selectedAlgo={selectedAlgo} />
    </>
  );
};
