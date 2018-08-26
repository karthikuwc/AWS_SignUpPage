import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";


import "assets/css/material-dashboard-react.css?v=1.4.1";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        const Component = prop.component;
        if (prop.exact)
          return <Route exact path={prop.path} render={(props)=><Component {...props}/>} key={key} />;//
        return <Route path={prop.path} render={(props)=><Component {...props}/>} key={key} />;//
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
