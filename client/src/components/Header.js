import React from "react";
import { Link } from "react-router-dom";
import Codify from "./Codify.png";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <img src={Codify} width="100rem" className="center" />
      </Link>
      <div className="center">
        <a className="left-margin-20">
          <Link to="/">Home</Link>
        </a>
        <a className="left-margin-20" href="http://localhost:3000/whiteboard">
          Whiteboard
        </a>
        <a className="left-margin-20">
          <Link to="/quiz">Quiz</Link>
        </a>
        <a className="left-margin-20">
          <Link to="/joblist">Job List</Link>
        </a>
        <a className="left-margin-20">
          <Link to="/qandas">Q&As</Link>
        </a>
      </div>
    </div>
  );
};

export default Header;
