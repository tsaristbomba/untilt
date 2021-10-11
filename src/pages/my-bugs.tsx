import React, { useEffect, useState } from "react";
import BugView from "../components/Bug view/bugView";
import LoadingSpinner from "../components/common/loading";
import BugCard from "../components/bugCard";
import Filter from "../components/common/filter";

import { useAppSelector } from "../redux/hooks";

// Types

const MyBugs = () => {
  const [displayBug, setDisplayBug] = useState<BugsFormTypes>({
    name: "",
    isDisplayed: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const { bugs, loading, isFiltered, myBugs, filteredArray } = useAppSelector(
    (state) => state.bugs
  );

  const handleName = (
    name: string,
    isDisplayed: boolean = !displayBug.isDisplayed
  ) => {
    setDisplayBug({
      isDisplayed: isDisplayed,
      name: name,
    });
  };

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
      <h1 className="text-center text-3xl font-medium mb-4">All My Bugs</h1>
      <Filter />
      <div className="flex flex-wrap gap-4 justify-center col-span-2">
        {!isFiltered &&
          myBugs !== null &&
          myBugs !== undefined &&
          myBugs.map((bug: any, key: number) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {myBugs.length === 0 && <p>No bugs found.</p>}
        {isFiltered &&
          filteredArray.map((bug: any, key: number) => (
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
