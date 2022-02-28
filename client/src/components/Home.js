import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Header from "./Header";
import Footer from "./Footer";
import Codify from "./Codify.png";
import Photo from "./Codify background.png";

const Home = () => {
  return (
    <div>
    <div className="row">
      <div className="col-lg-3 landing-body-left">
        <div>
        <Fade bottom>
      <img src={Codify} className="landing-logo" alt="Codify logo" />
      </Fade>
      </div>
        </div>
        <div className="col-lg-9 landing-body-right">
          <Fade right>
        <img src={Photo} className="col-lg-6 landing-photo" alt="Coding images" />
        </Fade>
          </div>
    </div>
      <div className="row">
      <div className="col-lg-3 landing-body-left">
        <Fade bottom>
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
     <div className="col-lg-9 landing-body-right">
      <div className="col-lg-6 landing-photo">
        {/* <img src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="landing-photo" alt="Woman on a computer" /> */}
        {/* <img src={Photo} alt="background image" /> */}
        </div>
      <div className="col-lg-6 landing-photo"></div>
      <div className="col-lg-3 landing-photo"></div>
      <Fade bottom>

     <div className="col-lg-9 landing-body-bottom">
    <Link to="/login"><button className="glow-on-hover">Register/Login</button></Link>
    </div>
    </Fade>

</div>
     </div>

    .






  </div>

  );
};

export default Home;
