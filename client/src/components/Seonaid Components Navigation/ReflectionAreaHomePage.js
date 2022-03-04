import e from "cors";
import React, { useState, useEffect } from "react";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ReflectionAreaHomePage.css";
import Fade from "react-reveal/Fade";

//this is a tab on the main page that contains links to all the "personal refelection" related components
function ReflectionAreaHomePage(props) {
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
      {" "}
      <Header
        tabIndex={3}
        getToken={props.getToken}
        loginStatus={props.loginStatus}
        setLoginStatus={props.setLoginStatus}
      />
      <div className="reflection-nav">
        <Fade bottom>
          <div className="row">
            <div className="reflection-container col-lg-6">
              <div>
                {" "}
                <b>Fine-tune your approach:</b> <br></br> Use these tools to
                reflect on the learning strategies that work best for you, to
                strategize and plan for your future, and to identify areas where
                you need improvement.
              </div>
              <NavLink className="job-reflection-link" to="/joblist">
                Job Priorities
              </NavLink>
              <button className="job-reflection-link">
                Code Diary (coming soon!)
              </button>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Person making notes"
              />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default ReflectionAreaHomePage;
