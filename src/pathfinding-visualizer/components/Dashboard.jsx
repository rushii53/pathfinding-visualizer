import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { useBoardContext } from "../contexts/BoardContext";
import { useEffect } from "react";

const algorithms = [
  { id: 1, name: "Dijkstra's Algorithm", value: "Dijkstra" },
  { id: 2, name: "Breadth-first Search", value: "BFS" },
  { id: 3, name: "Depth-first Search", value: "DFS" },
];
export const Dashboard = ({
  selectedAlgo,
  setAboutAlgo,
  setAlgo,
  visualizeAlgorithms,
}) => {
  const { graph, setGraph, startNode, endNode, setStartNode, setEndNode } =
    useBoardContext();

  useEffect(() => {
    if (selectedAlgo == "BFS" || selectedAlgo == "DFS") clearGraph("weights");
  }, [selectedAlgo]);

  const handleClick = () => {
    visualizeAlgorithms(selectedAlgo);
  };
  const clearGraph = (value) => {
    if (value == "board") {
      setStartNode({ row: 10, col: 9 });
      setEndNode({ row: 10, col: 40 });
    }
    let grid = [...graph];
    let isWeighted, isWall;
    for (let row = 0; row < 22; row++) {
      for (let col = 0; col < 54; col++) {
        isWeighted = grid[row][col].isWeighted;
        isWall = grid[row][col].isWall;
        if (value == "walls" || value == "board") {
          isWeighted = false;
          isWall = false;
        }
        if (value == "weights") {
          isWeighted = false;
        }
        (grid[row][col].row = row),
          (grid[row][col].col = col),
          (grid[row][col].isStartNode =
            row == startNode.row && col == startNode.col),
          (grid[row][col].isEndNode = row == endNode.row && col == endNode.col),
          (grid[row][col].isWall = isWall),
          (grid[row][col].isVisited = false),
          (grid[row][col].isWeighted = isWeighted),
          (grid[row][col].distance = Infinity),
          (grid[row][col].isShortestPath = false),
          (grid[row][col].isPath = false),
          (grid[row][col].previousNode = null);
      }
    }
    setGraph(grid);
  };

  const setAlgorithm = (algorithm) => {
    setAlgo(algorithm);
    switch (algorithm) {
      case "Dijkstra":
        setAboutAlgo(
          <>
            Dijkstras Algorithm is{" "}
            <span className="italic font-bold mx-1">weighted</span> and
            <span className="italic font-bold mx-1">garantees</span> shortest
            path!
          </>
        );
        break;
      case "BFS":
        setAboutAlgo(
          <>
            Breadth-first Search is{" "}
            <span className="italic font-bold mx-1">unweighted</span> and{" "}
            <span className="italic font-bold mx-1">garantees</span> the
            shortest path!
          </>
        );
        break;
      case "DFS":
        setAboutAlgo(
          <>
            Depth-first Search is{" "}
            <span className="italic font-bold mx-1"> unweighted </span> and{" "}
            <span className="italic font-bold mx-1">does not garantee</span> the
            shortest path!
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className="w-full h-14">
        <nav className="px-5 flex bg-gray-700 w-full h-12 text-white">
          <div className="flex">
            <div className="mx-2 h-full text-center flex">
              <h1 className="m-auto text-2xl font-extrabold">
                Pathfinding Visualizer
              </h1>
            </div>

            <div className="h-full z-20 w-56 p-1" style={{ cursor: "pointer" }}>
              <Menu>
                <Menu.Button
                  className={
                    "h-full font-semibold rounded w-full hover:text-emerald-400"
                  }
                >
                  Algorithms
                  <FontAwesomeIcon className="px-2" icon={faCaretDown} />
                </Menu.Button>
                <Menu.Items>
                  <div className="mt-2 p-1 rounded text-base bg-gray-700">
                    {algorithms.map((algorithm) => {
                      return (
                        <Menu.Item key={algorithm.id}>
                          <div
                            onClick={() => {
                              clearGraph("path");
                              setAlgorithm(algorithm.value);
                            }}
                            className="p-1 rounded hover:bg-emerald-400"
                          >
                            {algorithm.name}
                          </div>
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
            <div className="h-full p-1 flex font-semibold">
              <button
                onClick={() => handleClick()}
                className="px-3 mx-2 bg-emerald-400 hover:bg-emerald-300"
              >
                Visualize{" "}
                {selectedAlgo != "Algorithms" ? selectedAlgo + "!" : ""}
              </button>
              <button
                onClick={() => clearGraph("board")}
                className="px-3 mx-2 hover:text-emerald-400"
              >
                Reset Board
              </button>
              <button
                onClick={() => clearGraph("walls")}
                className="px-3 mx-2 hover:text-emerald-400"
              >
                Clear Walls & Weights
              </button>
              <button
                onClick={() => clearGraph("path")}
                className="px-3 mx-2 hover:text-emerald-400"
              >
                Clear Path
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
