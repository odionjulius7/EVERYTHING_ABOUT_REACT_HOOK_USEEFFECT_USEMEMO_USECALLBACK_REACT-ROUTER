import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Home from "./Home";
import About from "./About";
import People from "./People";
import Error from "./Error";
import Person from "./Person";
// navbar
import Navbar from "./Navbar";
const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* the switch helps match our route to the exact one 
        that matches in the path, to avoid the * path interference in all path */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/person/:id" children={<Person />}></Route>
        {/* To get Individual page for an item i.e. getting an item details in a list items
            the path attribute takes a parameter(e.g :id, :name etc) that can match the individual item you want 
            to see more of it details alone, 
            THEN, the component that takes such param and display that details as a children
        */}
        <Route path="*">
          {/* the * in the path attribute allows us to navigate 
              to the error page when ever a wrong url path is enter in our path directory
              * will always match d error page when no path assigned to our paths attribute is found
          */}
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
