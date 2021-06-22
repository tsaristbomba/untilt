import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";
import { filter } from "../../Controllers/Redux/bugSlice";
import BugView from "../Components/Bug view/bugView";
import PriorityController from "../../Controllers/priorityController";
import BugCard from "../Components/bugCard";
import LoadingSpinner from "../Components/loading";

const SelectedBugs = (props) => {
  const [displayBug, setDisplayBug] = useState({
    name: "",
    isDisplayed: false,
  });
  const [filteredArray, setFilteredArray] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { bugs, loading, isFiltered } = useSelector((state) => state.bugs);

  const handleName = (name) => {
    setDisplayBug({
      isDisplayed: !displayBug.isDisplayed,
      name: name,
    });
  };

  const { level } = PriorityController(props.priority);

  const selected =
    bugs !== null ? bugs.filter((b) => b.priority === props.priority) : null;

  const handleFilterBugs = () => {
    const pendingBugs = selected.filter((b) => b.status === "pending");

    selected !== null && setFilteredArray(pendingBugs);
    dispatch(filter());
  };

  useEffect(() => {
    const pendingBugs =
      bugs !== null && selected.filter((b) => b.status === "pending");

    bugs !== null && setFilteredArray(pendingBugs);
    // eslint-disable-next-line
  }, [bugs]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="p-6 pt-10 max-w-screen-xl m-auto">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-center text-3xl font-medium">
        {level} Priority Bugs
      </h1>
      <div className="flex flex-row items-center mb-4">
        Show Unresolved bugs:{" "}
        <button
          className="flex flex-row px-2 py-1 rounded ring-black ring-opacity-5 transition ease-in-out disabled:opacity-20"
          onClick={handleFilterBugs}
          disabled={bugs !== null && bugs.length === 0}
        >
          {!isFiltered ? (
            <BsToggleOff className="text-gray-700 text-2xl" />
          ) : (
            <BsToggleOn className="text-gray-700 text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center col-span-2">
        {!isFiltered &&
          bugs !== null &&
          selected !== false &&
          selected.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {selected === false && <p>No {level} priority bugs found.</p>}
        {isFiltered &&
          filteredArray !== null &&
          filteredArray.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {displayBug.isDisplayed && (
          <BugView
            bug={bugs.filter((bug) => bug.name === displayBug.name)[0]}
            clicked={handleName}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedBugs;
