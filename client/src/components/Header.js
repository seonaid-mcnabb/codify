import React from "react";
import { Link } from "react-router-dom";
import Codify from "./Codify.png";

const Header = () => {
  return (
    <div width="100%">
      <Link to="/">
        <img src={Codify} width="100rem" className="center margin" />
      </Link>
      <header className="center">
        <nav className="margin">
          <Link className="padded" to="/">
            Home
          </Link>
          <Link className="padded" to="/whiteboard">
            Whiteboard
          </Link>
          <Link className="padded" to="/quiz">
            Quiz
          </Link>
          <Link className="padded" to="/joblist">
            Job List
          </Link>
          <Link className="padded" to="/qandas">
            Q&As
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
