import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import "./DocumentationHomePage.css";
import Fade from "react-reveal/Fade";

//This is a tab in the header that, onClick, contains links to all of the personal
//coding documentation resources

function DocumentationHomePage() {
  return (
    <div className="documentation-nav">
      <Header />
      <Fade bottom>
        <div className="row">
          <div className="col-lg-6">
            <img
              src="https://images.pexels.com/photos/45717/pexels-photo-45717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              className="doc-photo"
              alt="Assortment of books"
            />
          </div>
          <div className="documentation-container col-lg-6">
            <div>Information on section</div>
            <NavLink className="q-and-a-link" to="/qandas">
              Q&As
            </NavLink>
            <NavLink className="q-and-a-link" to="/how-tos">
              My How To's
            </NavLink>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default DocumentationHomePage;
