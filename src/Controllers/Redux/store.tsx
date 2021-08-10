import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

// Reducers
import authReducer from "./authSlice";
import bugReducer from "./bugSlice";
import userReducer from "./userSlice";
import alertReducer from "./alertSlice";

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
export const store = configureStore({
  reducer,
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export function renderWithRedux(component: ReactElement) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}
