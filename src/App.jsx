import { Parent } from "./pathfinding-visualizer/components/Parent";
import { BoardContext } from "./pathfinding-visualizer/contexts/BoardContext";

function App() {
  return (
    <>
      <BoardContext>
        <Parent />
      </BoardContext>
    </>
  );
}

export default App;
