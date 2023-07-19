import { useEffect, useState } from "react";
import Node from "../node/Node";
import { useBoardContext } from "../contexts/BoardContext";

export default function Graph() {
  const { graph, startNode, endNode, setGraph} = useBoardContext();
  const [isClicked, setClicked] = useState(false);
  const [isStartSelected, setStartSelected] = useState(false);
  const [isEndSelected, setEndSelected] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  useEffect(() => {
    //initial grid
    let rowMatrix = [];
    for (let row = 0; row < 22; row++) {
      let rowData = [];
      for (let col = 0; col < 54; col++) {
        rowData.push({
          row: row,
          col: col,
          isStartNode: row == startNode.row && col == startNode.col,
          isEndNode: row == endNode.row && col == endNode.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          isWeighted: false,
          distance: Infinity,
          isShortestPath: false,
          previousNode: null,
          heuristicDistance:null,
        });
      }
      rowMatrix.push(rowData);
    }
    setGraph(rowMatrix);

    const handleKeyDown = (ev) => {
      if (ev.key == "w" || ev.key == "W") setKeyPressed(true);
    };
    const handleKeyUp = () => {
      setKeyPressed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <>
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
