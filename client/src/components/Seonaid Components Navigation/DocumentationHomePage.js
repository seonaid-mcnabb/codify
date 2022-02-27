import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import "./DocumentationHomePage.css";

//This is a tab in the header that, onClick, contains links to all of the personal
//coding documentation resources

function DocumentationHomePage() {
  return (
    <div className="documentation-nav">
      <Header></Header>

      <container className="documentation-navigation">
        <NavLink className="q-and-a-link" to="/qandas">
          Q&As
        </NavLink>
        <NavLink className="q-and-a-link" to="/how-tos">
          My How To's
        </NavLink>
      </container>
    </div>
  );
}

export default DocumentationHomePage;
