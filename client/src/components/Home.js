import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Codify from "./Codify.png";
const Home = () => {
  return (
    <div className="landing-page">
      {/* <Header /> */}
      <img src={Codify} className="landing-logo" alt="Codify logo" />
      <h1 className="landing-header">Welcome</h1>
    </div>
  );
};

export default Home;
