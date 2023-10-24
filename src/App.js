import { Fragment } from "react";
// import styles from "./_app.module.scss";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SchoolForm from "./components/pages/schoolForm/SchoolForm";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Menu from "./components/Utils/menu/Menu";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <SchoolForm></SchoolForm>
        </Route>
        <Route path="/homePage">
          <Menu></Menu>
          <Route path="/homePage/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/homePage/feeManagement">
            <h1>Fee Management</h1>
          </Route>
          <Route path="/homePage/student">
            <h1>Student</h1>
          </Route>
          <Route path="/homePage/Disbursal">
            <h1>Disbursal</h1>
          </Route>
          <Route path="/homePage/promote">
            <h1>Promote</h1>
          </Route>
          <Route path="/homePage/help">
            <h1>Help</h1>
          </Route>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
