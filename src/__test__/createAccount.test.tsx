import { render, screen } from "@testing-library/react";
import SignUp from "../Views/Pages/createAccount";
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

// Reducers
import authReducer from "../Controllers/Redux/authSlice";
import bugReducer from "../Controllers/Redux/bugSlice";
import userReducer from "../Controllers/Redux/userSlice";
import alertReducer from "../Controllers/Redux/alertSlice";
import { MemoryRouter } from "react-router-dom";

// Redux Config
const reducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
  user: userReducer,
  alert: alertReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

// Redux store
const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
});

describe("CREATE ACCOUNT", () => {
  it("submit and login buttons exists", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(/Login/i);
    const submitElement = screen.getByText(/Submit/i);

    expect(linkElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  //No tooltip
  // it("request email and password for submit", async () => {
  //   const { findByTestId } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <SignUp />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const btnElement = await findByTestId("submit-btn");

  //   await waitFor(() => fireEvent.click(btnElement));
  //});
});
