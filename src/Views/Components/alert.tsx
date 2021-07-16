import React, { useEffect } from "react";
import { clearAlert } from "../../Controllers/Redux/alertSlice";
import { clearBugsMsg } from "../../Controllers/Redux/bugSlice";
import { clearUserAlert } from "../../Controllers/Redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../Controllers/utils/hooks";

const Alert: React.FC = () => {
  const dispatch = useAppDispatch();

  const { type, msg, show } = useAppSelector((state) => state.alert);
  const { success, error } = useAppSelector((state) => state.bugs);

  useEffect(() => {
    setTimeout(() => {
      show && dispatch(clearAlert());
      show && dispatch(clearBugsMsg());
      show && dispatch(clearUserAlert());
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
