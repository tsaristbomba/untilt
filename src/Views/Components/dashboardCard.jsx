import React from "react";
import Priority from "../../Controllers/priorityController";
import { Link } from "react-router-dom";

const DashboardCard = (props) => {
  const { level, color } = Priority(props.priority);

  return (
    <Link
      to={props.path}
      onClick={props.handler}
      className={`${
        props.count === 0 ? "border-transparent opacity-90" : "hover:shadow-lg"
      } bg-white flex flex-row items-center justify-between shadow-md transition ease-in-out rounded px-6 py-10 w-full cursor-pointer`}
      style={{ color: color }}
    >
      <h2 className="text-3xl font-bold font-mono">{level} Priority Bugs</h2>
      <p
        className="font-bold text-white text-xl rounded-full bg-gray-700 flex items-center justify-center font-mono"
        style={{ height: "50px", width: "50px" }}
      >
        {props.count}
      </p>
    </Link>
  );
};

export default DashboardCard;
