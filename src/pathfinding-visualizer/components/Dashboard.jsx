export const Dashboard = () => {
  return (
    <>
      <div className="w-full h-32">
        <nav className="px-2 flex bg-gray-700 w-full h-12 text-white font-semibold text-xl text-center">
          <div className="flex">
            <h1 className="m-auto text-2xl font-extrabold">
              Pathfinding Visualizer
            </h1>
          </div>
          <div className="flex">
            <div className="m-auto">Algorithms</div>
          </div>
          <div className="flex">
            <button className="m-auto">Visualize</button>
          </div>
          <div className="flex">
            <button className="m-auto">Clear Board</button>
          </div>
        </nav>
        <div className="w-full h-full bg-white"></div>
      </div>
    </>
  );
};
