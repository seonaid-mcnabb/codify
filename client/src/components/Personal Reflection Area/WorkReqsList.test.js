import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import WorkReqsList from "./WorkReqsList";

Enzyme.configure({ adapter: new Adapter() });

describe("Testing the Future Work Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<WorkReqsList />); //before each tests, gets the WorkReqsList component to evaluate it
  });
  it("have paragraph elements", () => {
    wrapper.find("p");
  });
});
