import React, { useEffect, useState } from "react";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";
import { filter } from "../../Controllers/Redux/bugSlice";
import BugView from "../Components/Bug view/bugView";
import LoadingSpinner from "../Components/loading";
import BugCard from "../Components/bugCard";
import { useAppDispatch, useAppSelector } from "../../Controllers/utils/hooks";

// Types
type MyBugsFormTypes = {
  name: string;
  isDisplayed: boolean;
};

const MyBugs: React.FC = () => {
  const [displayBug, setDisplayBug] = useState<MyBugsFormTypes>({
    name: "",
    isDisplayed: false,
  });
  const [filteredArray, setFilteredArray] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { bugs, loading, isFiltered } = useAppSelector((state) => state.bugs);
  const { auth } = useAppSelector((state) => state);

  const handleName = (
    name: string,
    isDisplayed: boolean = !displayBug.isDisplayed
  ) => {
    setDisplayBug({
      isDisplayed: isDisplayed,
      name: name,
    });
  };

  const myBugs = bugs.filter(
    (b: { assigned: string }) => b.assigned === auth.user
  );

  const handleFilterBugs = () => {
    const pendingBugs = myBugs.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
    dispatch(filter());
  };

  useEffect(() => {
    const pendingBugs = myBugs.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
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
      <h1 className="text-center text-3xl font-medium">All Bugs</h1>
      <div className="flex flex-row items-center mb-4">
        Show Unresolved bugs:{" "}
        <button
          className="flex flex-row px-2 py-1 rounded ring-black ring-opacity-5 transition ease-in-out disabled:opacity-20"
          onClick={handleFilterBugs}
          disabled={myBugs.length === 0}
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
          bugs !== undefined &&
          myBugs.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {myBugs.length === 0 && <p>No bugs found.</p>}
        {isFiltered &&
          filteredArray.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {displayBug.isDisplayed && (
          <BugView
            bug={
              bugs.filter(
                (bug: { name: string }) => bug.name === displayBug.name
              )[0]
            }
            clicked={handleName}
          />
        )}
      </div>
    </div>
  );
};

export default MyBugs;