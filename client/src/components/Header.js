import React from "react";
import { Link } from "react-router-dom";
import Codify from "./Codify.png";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <img src={Codify} width="100rem" className="center" />
      </Link>
    </div>
  );
};

export default Header;
