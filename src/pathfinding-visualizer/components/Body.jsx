import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Graph from "../graph/Graph";
import {
  faCircleDot,
  faStarOfLife,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

export const Body = ({ aboutAlgo}) => {
  return (
    <>
      <div className="h-12 text-blue-900  px-5 w-full justify-center flex">
        <ul className="flex font-semibold text-xl">
          <li className="p-2">
            <FontAwesomeIcon
              className="destinations px-2"
              icon={faStarOfLife}
            />
            Start Node
          </li>
          <li className="p-2">
            <FontAwesomeIcon className="destinations px-2" icon={faCircleDot} />
            Target Node
          </li>
          <li className="p-2">
            <FontAwesomeIcon className="weight px-2" icon={faWeightHanging} />
            Weighted Node
          </li>
          <li className="p-2 flex ">
            <div className="w-6 h-6 mx-1 m-auto  bg-cyan-400"></div>
            <div className="w-6 h-6 mx-2 m-auto bg-purple-400"></div>
            Visited Node
          </li>
          <li className="p-2 flex ">
            <div className="w-6 h-6 mx-1 m-auto border border-blue-500"></div>
            Unvisited Node
          </li>
          <li className="p-2 flex">
            <div className="w-6 h-6 mx-2 m-auto shortest-path"></div>
            Shortest-Path Node
          </li>
          <li className="p-2 flex">
            <div className="w-6 h-6 mx-2 m-auto wall"></div>
            Wall Node
          </li>
        </ul>
      </div>
      <div className="h-6 m-3 flex justify-center text-xl text-center text-gray-500 w-full">
        {aboutAlgo}
      </div>
      <Graph/>
    </>
  );
};
