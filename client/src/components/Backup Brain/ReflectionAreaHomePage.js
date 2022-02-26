import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
