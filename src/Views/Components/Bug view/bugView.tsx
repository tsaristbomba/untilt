import React, { useState } from "react";
import { AiOutlineCheck } from "@react-icons/all-files/ai/AiOutlineCheck";
import ViewSection from "./bugViewSection";
import BugModel from "../../../Models/bugModel";
import PriorityController from "../../../Controllers/priorityController";
import { deleteBug, editBug } from "../../../Controllers/bugController";
import EditPanel from "../editPanel";
import BugForm from "../../Pages/bugForm";
import { useAppDispatch } from "../../../Controllers/utils/hooks";

// Types
type BugViewTypes = {
  loading?: boolean;
  bug: {
    name: string;
    details: string;
    steps: string;
    priority: number;
    assigned: string;
    version: string;
    time: string;
    id: string;
    status: string;
  };
  error?: string | null;
  success?: string | null;
  isFiltered?: boolean;
  clicked: (name: string, isDisplayed?: boolean) => void;
};

const BugView: React.FC<BugViewTypes> = (props): JSX.Element => {
  const dispatch = useAppDispatch();
  const bug = new BugModel(props.bug);

  const { color } = PriorityController(bug.priority);

  const [displayEdit, setDisplayEdit] = useState(false);
  const handleEdit = () => {
    setDisplayEdit(!displayEdit);
  };

  const handleDelete = (): void => {
    dispatch(deleteBug(bug.id));

    props.clicked("");
  };

  const handleMarkComplete = () => {
    const newBugStatus = {
      assigned: bug.assigned,
      details: bug.details,
      id: bug.id,
      name: bug.name,
      priority: bug.priority,
      status: "fulfilled",
      steps: bug.steps,
      version: bug.version,
    };

    dispatch(editBug(newBugStatus));

    props.clicked("");
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-40 min-h-screen min-w-screen flex items-center justify-center">
      <div className="w-4/5 lg:w-2/5 mt-10 mb-10 shadow-xl max-h-full overflow-y-auto bg-white rounded flex flex-col px-6 pt-6 pb-6">
        <EditPanel
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleClose={() => props.clicked("")}
          disabled={bug.status === "fulfilled"}
        />
        <div className="font-mono">
          <h1
            className="text-3xl text-center p-3 font-bold mb-4"
            style={{ color: color }}
          >
            {bug.name}
          </h1>
          <ViewSection title="Details" info={bug.details} />
          <ViewSection title="Steps" info={bug.steps} />
          <ViewSection title="Priority" info={bug.priority} />
          <ViewSection title="Assigned" info={bug.assigned} />
          <ViewSection title="App Version" info={bug.version} />
          <ViewSection title="Time Created" info={bug.time} />
        </div>
        <div className="flex  justify-center mt-2">
          <button
            className={`${
              bug.status === "fulfilled"
                ? "cursor-default hover:bg-gray-700"
                : "hover:bg-gray-600"
            }  text-2xl px-6 py-2 rounded font-medium inline-block text-white shadow-lg bg-gray-700 focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40`}
            onClick={() => handleMarkComplete()}
            disabled={bug.status === "fulfilled"}
          >
            <AiOutlineCheck />
          </button>
        </div>
      </div>
      {displayEdit && (
        <BugForm title="Edit Bug" bug={bug} close={handleEdit} edit />
      )}
    </div>
  );
};

export default BugView;
