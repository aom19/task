import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//pages
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Partners from "./pages/Parnters";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <>
        {/* navbar */}
        <>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/partners" component={Partners} exact />
          </Switch>
        </>
      </>
    </BrowserRouter>
  );
}

export default App;
