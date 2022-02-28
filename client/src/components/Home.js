import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
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
      <img src={Codify} className="landing-logo" alt="Codify logo" />
      </div>
        </div>
        <div className="col-lg-9 landing-body-right">
        <img src={Photo} className="col-lg-6 landing-photo" alt="Coding images" />


          </div>
    </div>
      <div className="row">
      <div className="col-lg-3 landing-body-left">
      <div>
       <span className="type">
       <span>
         <span>Organise your learning</span>
         <span>Test your knowledge</span>
         <span>Make visual notes</span>
         <span>Track your progress</span>
       </span>
     </span>
     </div>
     </div>
     <div className="col-lg-9 landing-body-right">
      <div className="col-lg-6 landing-photo">
        {/* <img src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="landing-photo" alt="Woman on a computer" /> */}
        {/* <img src={Photo} alt="background image" /> */}
        </div>
      <div className="col-lg-6 landing-photo"></div>
      <div className="col-lg-3 landing-photo"></div>

     <div className="col-lg-9 landing-body-bottom">
    <Link to="/login"><button className="glow-on-hover">Register/Login</button></Link>

</div>
</div>
     </div>

    .






  </div>

  );
};

export default Home;
