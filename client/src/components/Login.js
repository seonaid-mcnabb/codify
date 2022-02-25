import { chakra, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const Login = (props) => {
  return (
    <div>
      <Header />
      <form>
        <Button onClick={() => props.setLoginStatus(!props.loginStatus)}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
