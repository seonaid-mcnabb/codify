import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

//This is a tab in the header that, onClick, contains links to all of the personal
//coding documentation resources

function DocumentationHomePage() {
  return (
    <div>
      <Header></Header>
      <NavLink className="padded" to="/qandas">
        Q&As
      </NavLink>
    </div>
  );
}

export default DocumentationHomePage;
