import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Codify from "./Codify.png";

const Header = () => {
  return (
    <div width="100%">
      <NavLink to="/">
        <img src={Codify} width="100rem" className="center margin" />
      </NavLink>
      <header className="center">
        <nav className="margin">
          {/* styling info for tabs is here: https://chakra-ui.com/docs/disclosure/tabs && https://chakra-ui.com/docs/disclosure/tabs#make-a-tab-initially-active */}
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>
                <NavLink className="padded" to="/">
                  Home
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className="padded" to="/whiteboard">
                  Whiteboard
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className="padded" to="/quiz">
                  Quiz
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className="padded" to="/joblist">
                  Job List
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className="padded" to="/qandas">
                  Q&As
                </NavLink>
              </Tab>
            </TabList>
          </Tabs>
        </nav>
      </header>
    </div>
  );
};

export default Header;
