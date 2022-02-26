import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

//this is a tab on the main page that contains links to all the "personal refelection" related components
function ReflectionAreaHomePage() {
  return (
    <div>
      <Header> </Header>;
      <NavLink className="padded" to="/joblist">
        Job Priorities
      </NavLink>
    </div>
  );
}

export default ReflectionAreaHomePage;
