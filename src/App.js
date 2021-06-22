import React, { useEffect } from "react";
import Login from "./Views/Components/login";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "./Views/Sidebar/sidebar";
import ViewBugPage from "./Views/Pages/viewBugs";
import BugForm from "./Views/Pages/bugForm";
import Dashboard from "./Views/Pages/dashboard";
import SelectedBugs from "./Views/Pages/viewSelectedBugs";
import setAuthToken from "./Controllers/utils/setAuthToken";
import { loadUser } from "./Controllers/userController";
import { loadBugs } from "./Controllers/bugController";
import MyBugs from "./Views/Pages/myBugs";
import Alert from "./Views/Components/alert";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <div className="text-gray-800 bg-gray-100">
      <Alert />
      <Router>
        {!auth.loggedIn ? (
          <Login />
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
