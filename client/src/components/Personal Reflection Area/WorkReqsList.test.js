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

//TEST SUITE FOR HTML ELEMENTS/DESIGN\\
describe("Testing the Future Work Component Rendered Elements", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WorkReqsList />); //before each tests, gets the WorkReqsList component to evaluate it
  });
  it("should have a heading with explanatory text", () => {
    let componentTitle = wrapper.find("#professional-priorities-title");
    expect(componentTitle.text()).toBe("Professional Priorities");
  });
  it("should have must-have list title", () => {
    let mustHaveTitle = wrapper.find("#must-haves-title");
    expect(mustHaveTitle.text()).toBe("MUST-HAVES");
  });
  it("should have a negotiables list title", () => {
    let negotiablesTitle = wrapper.find("#negotiables-title");
    expect(negotiablesTitle.text()).toBe("NEGOTIABLES");
  });
  it("should have a deal-breakers list title", () => {
    let dealbreakersTitle = wrapper.find("#dealbreakers-title");
    expect(dealbreakersTitle.text()).toBe("DEAL-BREAKERS");
  });
  it("should have a nice-to-haves list title", () => {
    let niceToHaveTitle = wrapper.find("#nice2have-title");
    expect(niceToHaveTitle.text()).toBe("NICE TO HAVE");
  });
  it("should have an add new section", () => {
    let addNewSection = wrapper.find("#addNew-title");
    expect(addNewSection.text()).toBe("Add a new priority:");
  });
});

//TEST SUITES FOR FUNCTIONALITY OF ELEMENTS\\
describe("Testing the DropDown Select Type Menu", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WorkReqsList />); //before each tests, gets the WorkReqsList component to evaluate it
  });
  it("should have a dropdown menu", () => {
    let dropdownMenu = wrapper.find("#select-type-dropdown-menu");
    expect(dropdownMenu.exists()).toEqual(true);
  });
});
