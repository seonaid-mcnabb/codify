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

const Header = (props) => {
  return (
    <div className="nav-style" width="100%">
      <NavLink to="/">
        <div className="">
        <img src={Codify} width="100rem" className="header-logo" />
        </div>
      </NavLink>
      <header className="center">
        <nav className="margin">
          {/* styling info for tabs is here: https://chakra-ui.com/docs/disclosure/tabs && https://chakra-ui.com/docs/disclosure/tabs#make-a-tab-initially-active */}
          <Tabs
            defaultIndex={props.tabIndex}
            isFitted
            variant="enclosed-colored"
            size="xs"
            maxWidth="100%"
            colorScheme='blue'
          >
            <TabList mb="2em">
              {/* <Tab>
                <NavLink className="padded" to="/">
                  Home
                </NavLink>
              </Tab> */}
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
