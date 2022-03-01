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
      <Header />

      <div className="row">
        <div className="reflection-container col-lg-6">
        <div>
          Information on section
          </div>
          <NavLink className="job-reflection-link" to="/joblist">
        Job Priorities
      </NavLink>
      <button className="job-reflection-link">Code Diary (coming soon!)</button>
        </div>
        <div className="col-lg-6">
          <img src="https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Person making notes" />
        </div>
      </div>

    </div>
  );
}

export default ReflectionAreaHomePage;
