import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Codify from "./Codify.png";
const Home = () => {
  return (
    <div className="landing-body">
    <div className="landing-page">
      {/* <Header /> */}
      <img src={Codify} className="landing-logo" alt="Codify logo" />
      <h1 className="landing-header">Welcome</h1>
      <div className="typing">
      <span className="type">
      <span>
        <span>Organise your learning</span>
        <span>Test your knowledge</span>
        <span>Make visual notes</span>
        <span>Track your progress</span>
      </span>
    </span>
    </div>
    <br />
    <div className="middle">
    <Link to="/login"><button className="glow-on-hover">Start Codifying</button></Link>
    </div>
  </div>
  </div>
  );
};

export default Home;
