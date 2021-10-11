import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Utils
import { useAppDispatch, useAppSelector } from "./redux/hooks";

// Components
import Login from "./components/login";
import Sidebar from "./components/sidebar";
import setAuthToken from "./redux/utils/setAuthToken";
import { loadUser } from "./redux/user/userThunk";
import { loadBugs } from "./redux/bug/bugThunk";
import Alert from "./components/alert";
import { generateAlert } from "./redux/alert/alertSlice";

import ViewBugPage from "./pages/view-bugs";
import BugForm from "./pages/bug-form";
import Dashboard from "./pages/dashboard";
import SelectedBugs from "./pages/view-selected-bugs";
import MyBugs from "./pages/my-bugs";
import createAccount from "./pages/create-account";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { auth } = useAppSelector((state) => state);
  const { bugs } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadBugs());
  }, [dispatch]);

  React.useEffect((): void => {
    if (bugs.error !== null) {
      console.log("hey");
      dispatch(generateAlert({ type: "danger", msg: bugs.error }));
    }
    if (bugs.success !== null) {
      console.log("hey");

      dispatch(generateAlert({ type: "success", msg: bugs.success }));
    }
    //eslint-disable-next-line
  }, [bugs.error, bugs.success]);

  return (
    <div className="text-gray-800 bg-gray-100">
      <Alert />
      <Router>
        {!auth.loggedIn ? (
          <>
            <Switch>
              <Route exact path="/signup" component={createAccount} />
              <Route exact path="/" component={Login} />
            </Switch>
          </>
        ) : (
          <>
            <Sidebar />
            <div className="md:ml-64 md:mt-0 min-h-screen h-full">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/view-bugs" component={ViewBugPage} />
                <Route exact path="/my-bugs" component={MyBugs} />
                <Route path="/view-bugs/high-priority">
                  <SelectedBugs priority={1} />
                </Route>
                <Route path="/view-bugs/medium-priority">
                  <SelectedBugs priority={2} />
                </Route>
                <Route path="/view-bugs/low-priority">
                  <SelectedBugs priority={3} />
                </Route>
                <Route path="/create-bug">
                  <BugForm title="Create Bug" />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
