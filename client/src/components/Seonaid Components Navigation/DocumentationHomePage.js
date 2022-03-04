import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import "./DocumentationHomePage.css";
import Fade from "react-reveal/Fade";

//This is a tab in the header that, onClick, contains links to all of the personal
//coding documentation resources

function DocumentationHomePage(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus === false) {
      navigate(`/login`);
    }
  }, props);

  if (props.loginStatus === false) {
    navigate(`/login`);
  }
  return (
    <div>
      <Header
        tabIndex={4}
        getToken={props.getToken}
        loginStatus={props.loginStatus}
        setLoginStatus={props.setLoginStatus}
      />
      <div className="documentation-nav">
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
              <div>
                <b>Build as you learn:</b> <br></br>saving your own tutorials,
                Q&As, and preferred resources will not only enhance your
                understanding of course material, but also give you a personal
                library to reference before looking for answers on Stack
                Overflow.
              </div>
              <NavLink className="q-and-a-link" to="/qandas">
                Q&As
              </NavLink>
              <NavLink className="q-and-a-link" to="/how-tos">
                My How Tos
              </NavLink>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default DocumentationHomePage;
