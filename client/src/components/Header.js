import React, { useState } from "react";
import { NavLink, Link as ReactLink } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Button,
} from "@chakra-ui/react";
import Codify from "./Codify.png";

const Header = (props) => {
  let setLogout = () => {
    props.setLoginStatus(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLogout();
    props.getToken();
    // console.log(props.loginStatus);
  };

  return (
    <div className="nav-style" width="100%">
      <NavLink to="/">
        <div className="">
          <img src={Codify} width="100rem" className="header-logo" />
        </div>
      </NavLink>
      {props.loginStatus ? (
        <Button position="absolute" onClick={logout} top="2.25rem" right="3rem">
          Logout
        </Button>
      ) : (
        ""
      )}
      <header className="center">
        <nav className="margin">
          {/* styling info for tabs is here: https://chakra-ui.com/docs/disclosure/tabs && https://chakra-ui.com/docs/disclosure/tabs#make-a-tab-initially-active */}
          <Tabs
            defaultIndex={props.tabIndex}
            index={props.tabIndex}
            isFitted
            variant="enclosed-colored"
            size="xs"
            maxWidth="100%"
            colorScheme="blue"
          >
            <TabList mb="2em">
              <NavLink to="/dashboard">
                <Tab value={0}>
                  <NavLink className="padded" to="/dashboard">
                    Dashboard
                  </NavLink>
                </Tab>
              </NavLink>

              <NavLink to="/whiteboard">
                <Tab value={1}>
                  <NavLink className="padded" to="/whiteboard">
                    Whiteboard
                  </NavLink>
                </Tab>
              </NavLink>

              <NavLink to="/quiz">
                <Tab value={2}>
                  <NavLink className="padded" to="/quiz">
                    Quiz
                  </NavLink>
                </Tab>
              </NavLink>
              <NavLink to="/reflection-area-navigation">
                <Tab value={3}>
                  <NavLink className="padded" to="/reflection-area-navigation">
                    Reflection Area
                  </NavLink>
                </Tab>
              </NavLink>
              <NavLink to="/documentation-navigation">
                <Tab value={4}>
                  <NavLink className="padded" to="/documentation-navigation">
                    Personal Documentation
                  </NavLink>
                </Tab>
              </NavLink>
            </TabList>
          </Tabs>
        </nav>
      </header>
    </div>
  );
};

export default Header;
