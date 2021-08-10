import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../Controllers/utils/hooks";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";
import {
  filter,
  setFilteredArray,
  setMyBugs,
} from "../../../Controllers/Redux/bugSlice";

const Filter = () => {
  const [allBugsCount, setCount] = useState<number>(0);

  const { bugs, isFiltered, myBugs, filteredArray } = useAppSelector(
    (state) => state.bugs
  );
  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const handleFilterBugs = () => {
    const pendingBugs = myBugs.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
    dispatch(filter());
  };

  useEffect(() => {
    dispatch(
      setMyBugs(
        bugs.filter((b: { assigned: string }) => b.assigned === auth.user)
      )
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCount(filteredArray.length);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pendingBugs = myBugs.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
    // eslint-disable-next-line
  }, [bugs]);

  return (
    <div className="flex flex-row items-center mb-4">
      Show Unresolved bugs
      <span
        className="font-bold text-white text-xs rounded-full bg-gray-700 flex items-center justify-center font-mono mr-1 ml-1"
        style={{ height: "20px", width: "20px" }}
      >
        {allBugsCount}
      </span>
      :{" "}
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
  );
};

export default Filter;
