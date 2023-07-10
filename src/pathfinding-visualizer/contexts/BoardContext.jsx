import { createContext, useContext, useState } from "react";

const BoardStateContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
});

export const BoardContext = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <BoardStateContext.Provider value={{ isClicked, setIsClicked }}>
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardStateContext);
