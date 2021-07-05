import React from "react";
import PriorityController from "../../Controllers/priorityController";

const BugCard = ({ name, priority, version, status, clicked }) => {
  const handleClick = () => {
    clicked(name);
  };

  const { level, color } = PriorityController(priority);

  return (
    <div
      className={`${
        status === "fulfilled"
          ? "border-transparent opacity-80 hover:opacity-100"
          : "border-gray-700"
      } border-0 border-r-4  bg-white flex flex-col sm:flex-row items-center justify-between shadow-md hover:shadow-lg transition ease-in-out rounded py-5 px-6 w-full cursor-pointer`}
      onClick={handleClick}
    >
      {
        <h2 className="text-xl font-bold font-mono" style={{ color: color }}>
          {name}
        </h2>
      }
      <h3 className="text-gray-500 text-md">
        Priority:<span className="font-bold"> {level}</span>
      </h3>
      <h4 className="text-gray-500 text-sm">
        App Version: <span className="font-bold"> {version}</span>
      </h4>
    </div>
  );
};

export default BugCard;
