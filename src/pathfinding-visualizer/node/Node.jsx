import "./node.css";
import {
  faCircleDot,
  faStarOfLife,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  setStartNode,
  setEndNode,
  keyPressed,
}) {
  const handleMouseDown = () => {
    if (graph[rowIndex][colIndex].isStartNode) {
      setStartSelected(true);
    } else if (graph[rowIndex][colIndex].isEndNode) {
      setEndSelected(true);
    } else {
      setClicked(true);
    }
    if (
      isClicked &&
      !graph[rowIndex][colIndex].isStartNode &&
      !graph[rowIndex][colIndex].isEndNode
    ) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isWall = !cell[rowIndex][colIndex].isWall;
      setGraph(cell);
    }
  };
  const handleMouseUp = () => {
    if (isClicked) {
      setClicked(false);
    } else if (isStartSelected) {
      setStartNode({ rowIndex, colIndex });
      setStartSelected(false);
    } else if (isEndSelected) {
      setEndNode({ rowIndex, colIndex });
      setEndSelected(false);
    }
  };

  const handleMouseEnter = () => {
    if (
      isClicked &&
      !keyPressed &&
      !graph[rowIndex][colIndex].isWeighted &&
      !graph[rowIndex][colIndex].isStartNode &&
      !graph[rowIndex][colIndex].isEndNode
    ) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isWall = !cell[rowIndex][colIndex].isWall;
      cell[rowIndex][colIndex].isWeighted = false;
      setGraph(cell);
      return;
    } else if (
      isClicked &&
      keyPressed &&
      !graph[rowIndex][colIndex].isStartNode &&
      !graph[rowIndex][colIndex].isEndNode
    ) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isWeighted =
        !cell[rowIndex][colIndex].isWeighted;
      cell[rowIndex][colIndex].isWall = false;
      setGraph(cell);
      return;
    } else if (isStartSelected && !graph[rowIndex][colIndex].isEndNode) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isStartNode = true;
      cell[rowIndex][colIndex].isWall = false;
      setGraph(cell);
      return;
    } else if (isEndSelected && !graph[rowIndex][colIndex].isStartNode) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isEndNode = true;
      cell[rowIndex][colIndex].isWall = false;
      setGraph(cell);
      return;
    }
  };

  const handleMouseLeave = () => {
    if (isStartSelected) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isStartNode = false;
      setGraph(cell);
    } else if (isEndSelected) {
      const cell = [...graph];
      cell[rowIndex][colIndex].isEndNode = false;
      setGraph(cell);
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
          className={`m-auto justify-center items-center flex ${
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
