import React from "react";
import ReactDOM from "react-dom";
import MockRouter from "react-mock-router";
import "./utils/Tests/MockedLocalStorage";
import App from "./App";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

/* Mocking LocalStorage to make App.test.js work */
beforeAll(() => {
  global.localStorage.setItem(
    "token",
    Math.random()
      .toString(36)
      .substr(-8)
  );
});

afterAll(() => {
  global.localStorage.clear();
});

it("renders without crashing", () => {
  const div = document.createElement("div");

  const todoFormWrapper = shallow(
    <MockRouter>
      <App />
    </MockRouter>
  );
});
