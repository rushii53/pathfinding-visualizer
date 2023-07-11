import { createContext, useContext, useState } from "react";

const BoardStateContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
  graph: [[]],
  setGraph: () => {},
  startNode: {},
  setStartNode: () => {},
  endNode: {},
  setEndNode: () => {},
});

export const BoardContext = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [graph, setGraph] = useState([[]]);
  const [startNode, setStartNode] = useState({
    row: 10,
    col: 9,
  });
  const [endNode, setEndNode] = useState({
    row: 10,
    col: 40,
  });
  return (
    <BoardStateContext.Provider
      value={{ isClicked, setIsClicked, graph, setGraph , startNode, setStartNode, endNode,setEndNode}}
    >
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardStateContext);
