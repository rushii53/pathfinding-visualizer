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
  isRunning: false,
  setRunning: () => {},
  noWeights:false,
  setNoWeights:()=>{}
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
  const [isRunning,setRunning]=useState(false);
  const [isCompleted,setCompleted]=useState(false);
  const [noWeights,setNoWeights]=useState(false);
  return (
    <BoardStateContext.Provider
      value={{
        isClicked,
        setIsClicked,
        graph,
        setGraph,
        startNode,
        setStartNode,
        endNode,
        setEndNode,
        isRunning,
        setRunning,
        isCompleted,
        setCompleted,
        noWeights,
        setNoWeights
      }}
    >
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardStateContext);
