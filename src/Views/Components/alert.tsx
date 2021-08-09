import React, { useEffect } from "react";
import { clearAlert } from "../../Controllers/Redux/alertSlice";
import { clearAuthAlert } from "../../Controllers/Redux/authSlice";
import { clearBugsMsg } from "../../Controllers/Redux/bugSlice";
import { clearUserAlert } from "../../Controllers/Redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../Controllers/utils/hooks";

const Alert: React.FC = () => {
  const dispatch = useAppDispatch();

  const { type, msg, show } = useAppSelector((state) => state.alert);
  const { success, error } = useAppSelector((state) => state.bugs);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      show && dispatch(clearAlert());
      show && dispatch(clearBugsMsg());
      show && dispatch(clearUserAlert());
      show && dispatch(clearAuthAlert());
    }, 3000);
    // eslint-disable-next-line
  }, [show]);

  const handleMessage = (
    successMessage: string | null,
    errorMessage: string | null,
    generalMessage: string | null
  ): string => {
    if (successMessage && generalMessage !== null) {
      return successMessage;
    } else if (errorMessage && generalMessage !== null) {
      return errorMessage;
    } else if (
      successMessage &&
      errorMessage === null &&
      generalMessage !== null
    ) {
      return generalMessage;
    }
    return "";
  };

  return (
    <div className="fixed z-20 top-5 right-5 py-2 px-4">
      {show && (
        <div
          className={`${type === "danger" ? "bg-red-500" : "bg-green-500"}
           shadow-md py-2 px-4 no-underline rounded text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none`}
        >
          {handleMessage(success, error || auth.error, msg)}
        </div>
      )}
    </div>
  );
};

export default Alert;
