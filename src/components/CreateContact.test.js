import React from "react";
import ReactDOM from "react-dom";
import CreateContact from "./CreateContact";
//  Need to use MockRouter to use if for avoigin error on <Link/>
import MockRouter from "react-mock-router";

test("<CreateContact /> renders without crashing", () => {
  const container = document.createElement("div");
  ReactDOM.render(
    <MockRouter>
      <CreateContact />
    </MockRouter>,
    container
  );
  const form = container.querySelector("form");

  const { avatarURL, name, email } = form.elements;
  expect(avatarURL).toBeDefined();
  expect(name).toBeDefined();
  expect(email).toBeDefined();

  expect(avatarURL.value).toBe("");
  expect(name.value).toBe("");
  expect(email.value).toBe("");
});
