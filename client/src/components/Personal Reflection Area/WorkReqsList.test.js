import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import WorkReqsList from "./WorkReqsList";

/*Component Details
Purpose: to allow the user to start organizing and thinking about their  future job wants
Connects with: back-end database to store user input

View should include:
--Title (name of component) COMPLETE
--Description (why it's important to use this resource)
--An interactive list divided into sections
--Section 1: Header "Must-haves" COMPLETE
--Section 2: Header "Negotiables" COMPLETE
--Section 3: Header: "Deal Breakers" COMPLETE
--Section 4: Header: "Nice to Have" COMPLETE

STATES:
--[mustHaves, setMustHaves] COMPLETE
--[negotiables, setNegotiables] COMPLETE
--[dealBreakers, setDealBreakers] COMPLETE
--[niceToHaves, setNicetoHaves] COMPLETE*/

Enzyme.configure({ adapter: new Adapter() });

describe("Testing the Future Work Component Rendered Elements", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WorkReqsList />); //before each tests, gets the WorkReqsList component to evaluate it
  });
  it("should have a heading with explanatory text", () => {
    let componentTitle = wrapper.find("h1");
    expect(componentTitle.text()).toBe("My Professional Priorities");
  });
  it("should have must-have list title", () => {
    let mustHaveTitle = wrapper.find("#must-haves");
    expect(mustHaveTitle.text()).toBe("MUST-HAVES");
  });
  it("should have a negotiables list title", () => {
    let negotiablesTitle = wrapper.find("#negotiables");
    expect(negotiablesTitle.text()).toBe("NEGOTIABLES");
  });
  it("should have a deal-breakers list title", () => {
    let dealbreakersTitle = wrapper.find("#dealbreakers");
    expect(dealbreakersTitle.text()).toBe("DEAL-BREAKERS");
  });
  it("should have a nice-to-haves list title", () => {
    let niceToHaveTitle = wrapper.find("#nice2have");
    expect(niceToHaveTitle.text()).toBe("NICE TO HAVE");
  });
});
