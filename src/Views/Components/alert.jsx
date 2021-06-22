import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../Controllers/Redux/alertSlice";
import { clearBugsMsg } from "../../Controllers/Redux/bugSlice";

const Alert = () => {
  const dispatch = useDispatch();

  const { type, msg, show } = useSelector((state) => state.alert);
  const { success, error } = useSelector((state) => state.bugs);

  useEffect(() => {
    setTimeout(() => {
      show && dispatch(clearAlert());
      show && dispatch(clearBugsMsg());
    }, 3000);
    // eslint-disable-next-line
  }, [show]);

  return (
    <div className="fixed z-20 top-5 right-5 py-2 px-4">
      {show && (
        <div
          className={`${type === "danger" ? "bg-red-500" : "bg-green-500"}
           shadow-md py-2 px-4 no-underline rounded text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none`}
        >
          {msg !== null && msg}
          {success !== null && success}
          {error !== null && error}
        </div>
      )}
    </div>
  );
};

export default Alert;
