import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Header from "./Header";
import Footer from "./Footer";
import Codify from "./Codify.png";
import Photo from "./Codify background.png";

const Home = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-sm-12 landing-body-left">
          <div>
            <Fade bottom>
              <img src={Codify} className="landing-logo" alt="Codify logo" />
              <div>
                <span className="type">
                  <span>
                    <span>// Organise your learning</span>
                    <span>// Test your knowledge</span>
                    <span>// Make visual diagrams</span>
                    <span>// Track your progress</span>
                  </span>
                </span>
              </div>
            </Fade>
          </div>
        </div>
        <div className="col-lg-9 landing-body-right">
          <Fade right>
            <img
              src={Photo}
              className="col-lg-6 landing-photo"
              alt="Coding images"
            />
            <div className="col-lg-9 landing-body-bottom">
              <Link to="/dashboard">
                <button className="glow-on-hover">Register/Login</button>
              </Link>
            </div>
          </Fade>
        </div>
      </div>
      .
    </div>
  );
};

export default Home;
