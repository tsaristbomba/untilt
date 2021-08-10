import React, { useEffect, useState } from "react";
import BugView from "../Components/Bug view/bugView";
import LoadingSpinner from "../Components/loading";
import BugCard from "../Components/bugCard";

//Utils
import { useAppSelector } from "../../Controllers/utils/hooks";
import Filter from "../Components/common/filter";

// Types
type ViewBugsFormTypes = {
  name: string;
  isDisplayed: boolean;
};

const Bugs: React.FC = (): JSX.Element => {
  const [displayBug, setDisplayBug] = useState<ViewBugsFormTypes>({
    name: "",
    isDisplayed: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const { bugs, loading, isFiltered, filteredArray } = useAppSelector(
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
      <h1 className="text-center text-3xl font-medium mb-4">All Bugs</h1>
      <Filter all />
      <div className="flex flex-wrap gap-4 justify-center col-span-2">
        {!isFiltered &&
          bugs !== null &&
          bugs.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {bugs === null && filteredArray.length === 0 && <p>No bugs found.</p>}
        {isFiltered &&
          filteredArray !== null &&
          filteredArray.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {bugs !== null && displayBug.isDisplayed && (
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

export default Bugs;
