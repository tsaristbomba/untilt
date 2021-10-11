import { useEffect } from "react";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filter, setFilteredArray, setMyBugs } from "../../redux/bug/bugSlice";
import { loadBugs } from "../../redux/bug/bugThunk";

const Filter = ({ all }: FilterTypes) => {
  const { bugs, isFiltered, myBugs, filteredArray } = useAppSelector(
    (state) => state.bugs
  );
  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleFilterMyBugs = () => {
    const pendingBugs = myBugs.filter(
      (bug: { status: string }) => bug.status === "pending"
    );

    dispatch(setFilteredArray(pendingBugs));
    dispatch(filter());
  };

  const handleFilterBugs = () => {
    const pendingBugs = bugs.filter((b: BugTypes) => b.status === "pending");

    bugs !== null && dispatch(setFilteredArray(pendingBugs));
    dispatch(filter());
  };

  useEffect(() => {
    dispatch(loadBugs());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      setMyBugs(
        bugs.filter((b: { assigned: string }) => b.assigned === auth.user)
      )
    );

    let pendingBugs;

    if (all) {
      pendingBugs = bugs.filter(
        (bug: { status: string }) => bug.status === "pending"
      );
    } else {
      pendingBugs = myBugs.filter(
        (bug: { status: string }) => bug.status === "pending"
      );
    }

    dispatch(setFilteredArray(pendingBugs));
    // eslint-disable-next-line
  }, [bugs]);

  return (
    <div className="flex flex-row items-center mb-4">
      Show Unresolved bugs
      <span
        className="font-bold text-white text-xs rounded-full bg-gray-700 flex items-center justify-center font-mono mr-1 ml-1"
        style={{ height: "20px", width: "20px" }}
      >
        {filteredArray.length}
      </span>
      :{" "}
      <button
        className="flex flex-row px-2 py-1 rounded ring-black ring-opacity-5 transition ease-in-out disabled:opacity-20"
        onClick={all ? handleFilterBugs : handleFilterMyBugs}
        disabled={all ? bugs.length === 0 : myBugs.length === 0}
      >
        {!isFiltered ? (
          <BsToggleOff className="text-gray-700 text-2xl" />
        ) : (
          <BsToggleOn className="text-gray-700 text-2xl" />
        )}
      </button>
    </div>
  );
};

export default Filter;
