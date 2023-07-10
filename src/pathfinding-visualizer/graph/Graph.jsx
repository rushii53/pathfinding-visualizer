import { useEffect, useState } from "react";
import Node from "../node/node";
import { dijsktra, getShortestPath } from "../../algorithms/dijsktra-algorithm";
import { depthfirst } from "../../algorithms/depth-first";
import { breadthFirst } from "../../algorithms/breadth-first";

export default function Graph() {
  const [graph, setGraph] = useState([[]]);
  const [isClicked, setClicked] = useState(false);
  const [isStartSelected, setStartSelected] = useState(false);
  const [isEndSelected, setEndSelected] = useState(false);
  const [keyPressed,setKeyPressed]=useState(false);
  const [startNode, setStartNode] = useState({
    rowIndex: 10,
    colIndex: 9,
  });
  const [endNode, setEndNode] = useState({
    rowIndex: 10,
    colIndex: 40,
  });

  useEffect(() => {
    resetBoard();
    const handleKeyDown=(ev)=>{
      if(ev.key=='w' || ev.key=='W')
        setKeyPressed(true);
    }
    const handleKeyUp=()=>{
      setKeyPressed(false);
    }
    window.addEventListener('keydown',handleKeyDown);
    window.addEventListener('keyup',handleKeyUp);
  }, []);

  const resetBoard = () => {
    let rowMatrix = [];
    for (let row = 0; row < 22; row++) {
      let rowData = [];
      for (let col = 0; col < 54; col++) {
        rowData.push({
          row: row,
          col: col,
          isStartNode: row == startNode.rowIndex && col == startNode.colIndex,
          isEndNode: row == endNode.rowIndex && col == endNode.colIndex,
          isWall: false,
          isVisited: false,
          isPath: false,
          isWeighted: false,
          distance: Infinity,
          isShortestPath: false,
          previousNode: null,
        });
      }
      rowMatrix.push(rowData);
    }
    setGraph(rowMatrix);
  };
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

  const visualizeDijsktra = async () => {
    const visitedNodes = dijsktra(
      graph,
      graph[startNode.rowIndex][startNode.colIndex]
    );
    await animateAllPaths(visitedNodes);
    const shortesPath = getShortestPath(
      graph[endNode.rowIndex][endNode.colIndex]
    );
    animateShortestPath(shortesPath);
  };

  const visualizeDfs = async () => {
    const visitedNodes = depthfirst(
      graph,
      graph[startNode.rowIndex][startNode.colIndex]
    );
    await animateAllPaths(visitedNodes);
    animateShortestPath(visitedNodes);
  };
  const visualizeBfs = async () => {
    const visitedNodes = breadthFirst(
      graph,
      graph[startNode.rowIndex][startNode.colIndex]
    );
    await animateAllPaths(visitedNodes);
    const shortesPath = getShortestPath(
      graph[endNode.rowIndex][endNode.colIndex]
    );
    animateShortestPath(shortesPath);
  };

  return (
    <>
      <button className="m-1" onClick={() => resetBoard()}>
        Clear Board
      </button>
      <button className="m-1" onClick={() => visualizeDijsktra()}>
        Visualize Dijsktra
      </button>
      <button className="m-1" onClick={() => visualizeDfs()}>
        Visualize DFS
      </button>
      <button className="m-1" onClick={() => visualizeBfs()}>
        Visualize BFS
      </button>
      <div className="w-full h-full">
        {graph &&
          graph.map((row, rowIndex) => (
            <div className="flex justify-center" key={rowIndex}>
              {row.map((col, colIndex) => (
                <div key={`${rowIndex}${colIndex}`}>
                  <Node
                    graph={graph}
                    setGraph={setGraph}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isClicked={isClicked}
                    setClicked={setClicked}
                    isStartSelected={isStartSelected}
                    setStartSelected={setStartSelected}
                    isEndSelected={isEndSelected}
                    setEndSelected={setEndSelected}
                    setStartNode={setStartNode}
                    setEndNode={setEndNode}
                    keyPressed={keyPressed}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
