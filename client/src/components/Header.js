import React from "react";
import { NavLink, Link as ReactLink } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from "@chakra-ui/react";
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
          <Tabs isFitted variant="enclosed-colored" size="xs" maxWidth="100%">
            <TabList mb="2em">
              <Tab>
                <NavLink className="padded" to="/home">
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
                <NavLink className="padded" to="/reflection-area-navigation">
                  Reflection Area
                </NavLink>
              </Tab>
              <Tab>
                <NavLink className="padded" to="/documentation-navigation">
                  Personal Documentation
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
