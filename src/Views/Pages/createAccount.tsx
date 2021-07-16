import React, { useState, useEffect } from "react";
import {
  // useHistory,
  Link,
} from "react-router-dom";
import { signUp } from "../../Controllers/userController";
import LoadingSpinner from "../Components/loading";
import { generateAlert } from "../../Controllers/Redux/alertSlice";
import { useAppDispatch, useAppSelector } from "../../Controllers/utils/hooks";

// Types
type CreateAccountFormTypes = {
  name: string;
  password: string;
  password2: string;
};

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state);

  //   let history = useHistory();

  const [formInput, setFormInput] = useState<CreateAccountFormTypes>({
    name: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formInput.name !== "" || formInput.password !== "") {
      if (formInput.password === formInput.password2) {
        dispatch(signUp(formInput));

        // history.push("/");
      } else {
        dispatch(
          generateAlert({ type: "danger", msg: "Passwords don't match" })
        );
      }
    }
  };

  useEffect(() => {
    if (user.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user.loading]);

  useEffect(() => {
    if (user.error !== null) {
      dispatch(generateAlert({ type: "danger", msg: user.error }));
    }
    if (user.success !== null) {
      dispatch(generateAlert({ type: "success", msg: user.success }));
    }
    // eslint-disable-next-line
  }, [user.error, user.success]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          {loading && <LoadingSpinner />}
          <h1 className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            Create Account
          </h1>
          {/* <label htmlFor="name">Username:</label> */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => handleInputChange(e)}
            value={formInput.name}
            required
            autoComplete="username"
          />
          {/* <label htmlFor="password">Password:</label> */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInputChange(e)}
            value={formInput.password}
            required
            autoComplete="current-password"
          />
          {/* <label htmlFor="password2">Repeat Password:</label> */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="password"
            name="password2"
            placeholder="Repeat password"
            onChange={(e) => handleInputChange(e)}
            value={formInput.password2}
            required
            autoComplete="current-password"
          />
          <div className="flex justify-center mt-2">
            <button
              className={`hover:bg-gray-600 px-6 py-2 rounded font-medium inline-block text-white shadow-lg bg-gray-700 focus:bg-gray-200 ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40`}
              type="submit"
            >
              Submit
            </button>
          </div>
          <Link className="text-blue-500 text-sm hover:underline" to="/">
            Login
          </Link>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Untilt. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
