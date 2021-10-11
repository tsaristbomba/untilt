import React, { useState, useEffect } from "react";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import LoadingSpinner from "../components/common/loading";

import { createBug, editBug } from "../redux/bug/bugThunk";
import { getAllUsers } from "../redux/user/userThunk";
import { generateAlert } from "../redux/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const BugForm: React.FC<BugFormTypes> = (props) => {
  const [bugObj, setBugObj] = useState<BugObjectTypes>({
    name: props.bug !== undefined ? props.bug.name : "",
    details: props.bug !== undefined ? props.bug.details : "",
    steps: props.bug !== undefined ? props.bug.steps : "",
    priority: props.bug !== undefined ? props.bug.priority : "",
    status: props.bug !== undefined ? props.bug.status : "",
    assigned: props.bug !== undefined ? props.bug.assigned : "",
    version: props.bug !== undefined ? props.bug.version : "",
    time: props.bug !== undefined ? props.bug.time : "",
    id: props.bug !== undefined ? props.bug.id : "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.user);
  const { error, success } = useAppSelector((state) => state.bugs);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    setBugObj({
      ...bugObj,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(createBug(bugObj));
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(editBug(bugObj));

    props.close !== undefined && props.close();
  };

  useEffect((): void => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect((): void => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  useEffect((): void => {
    if (error !== null) {
      dispatch(generateAlert({ type: "danger", msg: error }));
    }
    if (success !== null) {
      dispatch(generateAlert({ type: "success", msg: success }));
    }
    //eslint-disable-next-line
  }, [error, success]);

  return (
    <div
      className={`${
        props.title === "Edit Bug"
          ? "fixed z-20 max-h-full shadow-2xl"
          : "min-h-screen"
      } flex flex-col items-center justify-center`}
    >
      {isLoading && <LoadingSpinner />}
      <form
        className="bg-white shadow-xl rounded px-6 pt-6 pb-6 mb-4 w-96 max-h-full overflow-y-auto"
        onSubmit={(e) => (props.edit ? handleEditSubmit(e) : handleSubmit(e))}
      >
        {props.title === "Edit Bug" && (
          <div className="w-full flex justify-end">
            <button
              onClick={props.close}
              className="px-4 py-2 m-2 rounded text-lg font-medium inline-block text-white shadow-lg hover:bg-red-400 bg-red-500  focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out"
            >
              <IoClose />
            </button>
          </div>
        )}
        <h1 className="w-full text-gray-800 text-2xl flex justify-center font-medium py-2 mb-4 border-b-2">
          {props.title}
        </h1>
        <label htmlFor="">Name: </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2 disabled:opacity-50"
          type="text"
          placeholder="Bug Name"
          name="name"
          required
          onChange={(e) => handleChange(e)}
          value={bugObj.name}
          disabled={props.edit}
        />
        <label>Details: </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
          name="details"
          placeholder="Steps to recreate the bug"
          required
          onChange={(e) => handleChange(e)}
          value={bugObj.details}
        />
        <label>Steps: </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
          name="steps"
          placeholder="Steps to recreate the bug"
          required
          onChange={(e) => handleChange(e)}
          value={bugObj.steps}
        />
        <label htmlFor="priority">Priority: </label>
        <select
          className="w-full py-2 px-3 focus:outline-none focus:ring ring-1 ring-black ring-opacity-20 rounded mb-2"
          name="priority"
          id="priority"
          required
          onChange={(e) => handleChange(e)}
          value={bugObj.priority}
        >
          <option value="" disabled defaultValue="">
            Select
          </option>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
        <label htmlFor="assigned">Assigned: </label>
        <select
          className="w-full py-2 px-3 focus:outline-none focus:ring ring-1 ring-black ring-opacity-20 rounded mb-2"
          name="assigned"
          id="assigned"
          onChange={(e) => handleChange(e)}
          value={bugObj.assigned}
        >
          <option value="" disabled defaultValue="">
            Select
          </option>
          {users.data.map((u: { name: string }, key: number) => (
            <option key={key} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
        <label htmlFor="">Application Version: </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-4"
          type="text"
          placeholder="Application Version"
          onChange={(e) => handleChange(e)}
          name="version"
          value={bugObj.version}
        />
        <div className="w-full flex items-center">
          <button
            className="px-6 py-2 mx-auto rounded font-medium inline-block text-white shadow-lg hover:bg-gray-600 bg-gray-700 focus:bg-gray-200 hover:shadow-2xl ring-black ring-opacity-5 transition ease-in-out"
            type="submit"
            data-testid="create-bug-btn"
          >
            {props.title}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BugForm;
