import React from "react";
import ReactDOM from "react-dom";
import ListContacts from "./ListContacts";
//  Need to use MockRouter to use if for avoigin error on <Link/>
import MockRouter from "react-mock-router";
// import { render, fireEvent } from "@testing-library/react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const fakeContacts = [
  {
    avatarURL: "http://localhost:5001/michael.jpg",
    email: "michael@reacttraining.com",
    id: "michael",
    name: "Michael Jackson"
  },
  {
    avatarURL: "http://localhost:5001/ryan.jpg",
    email: "ryan@reacttraining.com",
    id: "ryan",
    name: "Ryan Florence"
  },
  {
    avatarURL: "http://localhost:5001/tyler.jpg",
    email: "tyler@reacttraining.com",
    id: "tyler",
    name: "Tyler McGinnis"
  }
];

test("<ListContacts/> renders properly", () => {
  const onDeleteContactMock = jest.fn();
  const container = document.createElement("div");
  ReactDOM.render(
    <MockRouter>
      <ListContacts
        contacts={fakeContacts}
        onDeleteContact={onDeleteContactMock}
      />
    </MockRouter>,
    container
  );
  const addContactButtons = container.getElementsByClassName("add-contact");

  // Renders an Add Contact button
  expect(addContactButtons).toBeDefined();
  expect(addContactButtons).toHaveLength(1);

  // Renders a search box
  const searchInputs = container.getElementsByClassName("search-contacts");
  expect(searchInputs).toBeDefined();
  expect(searchInputs).toHaveLength(1);
  expect(searchInputs[0].placeholder).toBe("Search contacts");

  // Needs to receive a contacts ...
  const contactsItems = container.getElementsByClassName("contact-list-item");
  expect(contactsItems).toBeDefined();
  expect(contactsItems).toHaveLength(3);

  const firstContact = contactsItems[0];
  expect(firstContact.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    firstContact.getElementsByClassName("contact-avatar")[0].style[
      "background-image"
    ]
  ).toBe("url(" + fakeContacts[0].avatarURL + ")");
  expect(
    firstContact.getElementsByClassName("contact-details")[0].textContent
  ).toBe(fakeContacts[0].name + fakeContacts[0].email);

  const second = contactsItems[1];
  expect(second.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    second.getElementsByClassName("contact-avatar")[0].style["background-image"]
  ).toBe("url(" + fakeContacts[1].avatarURL + ")");
  expect(second.getElementsByClassName("contact-details")[0].textContent).toBe(
    fakeContacts[1].name + fakeContacts[1].email
  );

  const third = contactsItems[2];
  expect(third.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    third.getElementsByClassName("contact-avatar")[0].style["background-image"]
  ).toBe("url(" + fakeContacts[2].avatarURL + ")");
  expect(third.getElementsByClassName("contact-details")[0].textContent).toBe(
    fakeContacts[2].name + fakeContacts[2].email
  );
});

test("<ListContacts/> deletes contact properly", () => {
  //   Search: update and clearQuery

  // With filtered contacts has an special form
  // list contacts
  const onDeleteContactMock = jest.fn();
  const container = document.createElement("div");
  ReactDOM.render(
    <MockRouter>
      <ListContacts
        contacts={fakeContacts}
        onDeleteContact={onDeleteContactMock}
      />
    </MockRouter>,
    container
  );

  const wrapper = mount(
    <MockRouter>
      <ListContacts
        contacts={fakeContacts}
        onDeleteContact={onDeleteContactMock}
      />
    </MockRouter>
  );

  const buttons = container.querySelector(".contact-remove");
  console.log("buttons: ", buttons);

  buttons.onclick();
  buttons.onclick();

  buttons.onclick();

  buttons.onclick();
  expect(onDeleteContactMock.mock.calls.length).toHaveBeenCalledTimes(1);

  const contactsItems = container.getElementsByClassName("contact-list-item");
  expect(contactsItems).toBeDefined();
  expect(contactsItems).toHaveLength(3);

  const firstContact = contactsItems[0];
  expect(firstContact.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    firstContact.getElementsByClassName("contact-avatar")[0].style[
      "background-image"
    ]
  ).toBe("url(" + fakeContacts[0].avatarURL + ")");
  expect(
    firstContact.getElementsByClassName("contact-details")[0].textContent
  ).toBe(fakeContacts[0].name + fakeContacts[0].email);

  const second = contactsItems[1];
  expect(second.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    second.getElementsByClassName("contact-avatar")[0].style["background-image"]
  ).toBe("url(" + fakeContacts[1].avatarURL + ")");
  expect(second.getElementsByClassName("contact-details")[0].textContent).toBe(
    fakeContacts[1].name + fakeContacts[1].email
  );

  const third = contactsItems[2];
  expect(third.getElementsByClassName("contact-avatar")).toBeDefined();
  expect(
    third.getElementsByClassName("contact-avatar")[0].style["background-image"]
  ).toBe("url(" + fakeContacts[2].avatarURL + ")");
  expect(third.getElementsByClassName("contact-details")[0].textContent).toBe(
    fakeContacts[2].name + fakeContacts[2].email
  );
});

// Searches and works
