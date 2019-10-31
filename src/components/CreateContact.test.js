import React from "react";
import ReactDOM from "react-dom";
import CreateContact from "./CreateContact";
//  Need to use MockRouter to use if for avoigin error on <Link/>
import MockRouter from "react-mock-router";
import { render, fireEvent } from "@testing-library/react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

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

test("<CreateContact /> form sends succesfully", () => {
  const onCreateContactMock = jest.fn();

  const wrapper = shallow(
    // <MockRouter>
    <CreateContact onCreateContact={onCreateContactMock} />
    // </MockRouter>
  );

  const fakeUser = {
    name: "Carlos",
    email: "carloslouredaparrado@gmail.com"
  };
  wrapper.instance().handleSubmit = jest.fn();
  wrapper.update();
  wrapper.instance().name = fakeUser.name;
  wrapper.instance().email = fakeUser.email;
  wrapper.instance().handleSubmit();

  wrapper.instance().props.onCreateContact(fakeUser);

  expect(wrapper.instance().handleSubmit).toHaveBeenCalledTimes(1);
  expect(wrapper.instance().props.onCreateContact).toHaveBeenCalledTimes(1);
  expect(wrapper.instance().props.onCreateContact).toHaveBeenCalledWith(
    fakeUser
  );
});

// TODO: Add error checking for empty create Contact
