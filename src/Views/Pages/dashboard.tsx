import React, { useState, useEffect } from "react";
import { loadBugs } from "../../Controllers/bugController";
import { useAppDispatch, useAppSelector } from "../../Controllers/utils/hooks";
import DashboardCard from "../Components/dashboardCard";
import LoadingSpinner from "../Components/loading";

const Dashboard: React.FC = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { bugs, loading } = useAppSelector((state) => state.bugs);

  const filterBugs = (priority: number) => {
    const filteredBugs =
      bugs !== null
        ? bugs.filter((b: { priority: number }) => b.priority === priority)
        : [];
    return filteredBugs;
  };

  let highBugs: number = 0;
  let mediumBugs: number = 0;
  let lowBugs: number = 0;
  if (bugs !== undefined) {
    highBugs = filterBugs(1).length;
    mediumBugs = filterBugs(2).length;
    lowBugs = filterBugs(3).length;
  }

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

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
      <h1 className="text-center text-3xl font-medium mb-6">Dashboard</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center col-span-2 mt-2">
        {" "}
        <DashboardCard
          priority={1}
          count={highBugs}
          path={`${highBugs !== 0 ? "/view-bugs/high-priority" : "/"}`}
        />
        <DashboardCard
          priority={2}
          count={mediumBugs}
          path={`${mediumBugs !== 0 ? "/view-bugs/medium-priority" : "/"}`}
        />
        <DashboardCard
          priority={3}
          count={lowBugs}
          path={`${lowBugs !== 0 ? "/view-bugs/low-priority" : "/"}`}
        />
      </div>
    </div>
  );
};

export default Dashboard;
