import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BreedDetails from "./components/BreedDetails";
import CreateBreedForm from "./components/CreateBreedForm";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/create-breed" component={CreateBreedForm}></Route>
      <Route path="/breed-details/:id" component={BreedDetails}></Route>
    </BrowserRouter>
  );
}

export default App;
