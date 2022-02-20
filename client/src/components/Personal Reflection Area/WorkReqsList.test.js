import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import WorkReqsList from "./WorkReqsList";

/*Component Details
Purpose: to allow the user to start organizing and thinking about their  future job wants
Connects with: back-end database to store user input

View should include:
--Title (name of component)
--Description (why it's important to use this resource)
--An interactive list divided into sections
--Section 1: Header "Must-haves"
--Section 2: Header "Negotiables"
--Section 3: Header: "Deal Breakers"
--Section 4: Header: "Would be Nice to Have"

STATES:
--[mustHaves, setMustHaves]
--[negotiables, setNegotiables]
--[dealBreakers, setDealBreakers]
--[niceToHaves, setNicetoHaves]*/

Enzyme.configure({ adapter: new Adapter() });

describe("Testing the Future Work Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WorkReqsList />); //before each tests, gets the WorkReqsList component to evaluate it
  });
  it("should have paragraph elements", () => {
    wrapper.find("p");
  });
});
