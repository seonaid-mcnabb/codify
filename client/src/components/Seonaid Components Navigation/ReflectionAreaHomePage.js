import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import "./ReflectionAreaHomePage.css";

//this is a tab on the main page that contains links to all the "personal refelection" related components
function ReflectionAreaHomePage() {
  return (
    <div className="reflection-nav">
      <Header> </Header>
      <NavLink className="job-reflection-link" to="/joblist">
        Job Priorities
      </NavLink>
      <button className="job-reflection-link">Code Diary (coming soon!)</button>
    </div>
  );
}

export default ReflectionAreaHomePage;
