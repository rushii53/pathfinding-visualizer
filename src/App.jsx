import { Dashboard } from "./pathfinding-visualizer/components/Dashboard"
import { BoardContext } from "./pathfinding-visualizer/contexts/BoardContext"
import Graph from "./pathfinding-visualizer/graph/Graph";

function App() {
  return (
    <>
      <BoardContext>
        <Dashboard/>
        <Graph/>
      </BoardContext>
    </>
  )
}

export default App
