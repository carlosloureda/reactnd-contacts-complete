import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./utils/Tests/MockedLocalStorage";
import App from "./App";

/* Mocking LocalStorage to make App.test.js work */
beforeAll(() => {
  global.localStorage.setItem(
    "token",
    Math.random()
      .toString(36)
      .substr(-8)
  );
  console.log("global.localStorage: ", global.localStorage);
});

afterAll(() => {
  global.localStorage.clear();
});

// it("renders without crashing", () => {
//   const div = document.createElement("div");

//   ReactDOM.render(<App />, div);
// });
