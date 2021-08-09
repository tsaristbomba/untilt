import { render, screen } from "@testing-library/react";
import BugForm from "../Views/Pages/bugForm";
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

describe("CREATE BUG", () => {
  it("Has Create Bug button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BugForm title="Create Bug" />
        </MemoryRouter>
      </Provider>
    );

    const btnElement = screen.getByTestId("create-bug-btn");

    expect(btnElement).toHaveTextContent("Create Bug");
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
