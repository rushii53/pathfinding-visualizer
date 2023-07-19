import "./node.css";
import {
  faCircleDot,
  faStarOfLife,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBoardContext } from "../contexts/BoardContext";
import { useState } from "react";
export default function Node({
  graph,
  setGraph,
  rowIndex,
  colIndex,
  isClicked,
  setClicked,
  isStartSelected,
  setStartSelected,
  isEndSelected,
  setEndSelected,
  keyPressed,
}) {
  const { setEndNode, setStartNode,isRunning,noWeights} = useBoardContext();
  const [isWall, setWall] = useState(false);
  const [isWeighted, setWeighted] = useState(false);
  const handleMouseDown = () => {
    if(isRunning)
      return;
    const cell = graph[rowIndex][colIndex];
    setClicked(true);
    if (cell.isStartNode) {
      setStartSelected(true);
    } else if (cell.isEndNode) {
      setEndSelected(true);
    } else if (keyPressed && !isStartSelected && !isEndSelected && !noWeights) {
      const grid = [...graph];
      grid[rowIndex][colIndex].isWeighted =
        !graph[rowIndex][colIndex].isWeighted;
      grid[rowIndex][colIndex].isWall = false;
      setGraph(grid);
    } else {
      const grid = [...graph];
      graph[rowIndex][colIndex].isWall = !graph[rowIndex][colIndex].isWall;
      graph[rowIndex][colIndex].isWeighted = false;
      setGraph(grid);
    }
  };

  const handleMouseEnter = () => {
    if (
      isClicked &&
      !isStartSelected &&
      !isEndSelected &&
      !graph[rowIndex][colIndex].isStartNode &&
      !graph[rowIndex][colIndex].isEndNode
    ) {
      const grid = [...graph];
      if (keyPressed && !noWeights) {
        grid[rowIndex][colIndex].isWeighted =
          !graph[rowIndex][colIndex].isWeighted;
        grid[rowIndex][colIndex].isWall = false;
      } else {
        graph[rowIndex][colIndex].isWall = !graph[rowIndex][colIndex].isWall;
        graph[rowIndex][colIndex].isWeighted = false;
      }
      setGraph(grid);
    } else if ((isStartSelected || isEndSelected) && isClicked) {
      const grid = [...graph];
      if (isStartSelected) grid[rowIndex][colIndex].isStartNode = true;
      else grid[rowIndex][colIndex].isEndNode = true;
      setWall(grid[rowIndex][colIndex].isWall);
      setWeighted(grid[rowIndex][colIndex].isWeighted);
      graph[rowIndex][colIndex].isWall = false;
      graph[rowIndex][colIndex].isWeighted = false;
      setGraph(grid);
    }
  };

  const handleMouseLeave = () => {
    if (isClicked && (isStartSelected || isEndSelected)) {
      const grid = [...graph];
      grid[rowIndex][colIndex].isStartNode = false;
      grid[rowIndex][colIndex].isEndNode = false;
      grid[rowIndex][colIndex].isWall = isWall;
      grid[rowIndex][colIndex].isWeighted = isWeighted;
      setGraph(grid);
    }
  };

  const handleMouseUp = () => {
    setClicked(false);
    if (isStartSelected) {
      setStartNode({ row: rowIndex, col: colIndex });
      setStartSelected(false);
    } else if (isEndSelected) {
      setEndNode({ row: rowIndex, col: colIndex });
      setEndSelected(false);
    }
  };

  return (
    <>
      <div
        className={`w-7 h-7 outline outline-1 justify-center flex outline-blue-300`}
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div
          className={`justify-center items-center flex ${
            graph[rowIndex][colIndex].isWall ? "wall z-10" : ""
          } ${graph[rowIndex][colIndex].isPath ? "path" : ""}
            ${graph[rowIndex][colIndex].isShortestPath ? "shortest-path" : ""}`}
        >
          {graph[rowIndex][colIndex].isStartNode ? (
            <FontAwesomeIcon
              className="destinations"
              style={{ color: "#1159d4" }}
              icon={faStarOfLife}
            />
          ) : graph[rowIndex][colIndex].isEndNode ? (
            <FontAwesomeIcon
              className="destinations"
              icon={faCircleDot}
              style={{ color: "#1159d4" }}
            />
          ) : graph[rowIndex][colIndex].isWeighted ? (
            <FontAwesomeIcon
              className="weight"
              icon={faWeightHanging}
              style={{ color: "#00328a" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
