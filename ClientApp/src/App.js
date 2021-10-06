import React, { Component } from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import MyContent from "./components/MyContent";

import "./custom.css";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/MyContent" component={MyContent} />
    </Layout>
  );
}

export default App;
