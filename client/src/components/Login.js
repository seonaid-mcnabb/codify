import {
  chakra,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import Header from "./Header";
const axios = require("axios").default;

const Login = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus === true) {
      navigate(`/dashboard`);
    }
  }, props);

  if (props.loginStatus === true) {
    navigate(`/dashboard`);
  }
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("http://localhost:5000/users/login", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      // console.log(data.message, data.token);
      props.getToken();
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  // const requestData = async () => {
  //   try {
  //     const { data } = await axios("/users/profile", {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });

  //     console.log(data.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const isError = credentials === "";

  return (
    <Fade bottom>
      <center>
        <div>
          <Box
            className="Length"
            bg="#BFE8F3"
            borderRadius="1rem"
            padding="2rem"
            width="600px"
            maxWidth="90%"
          >
            <p className="center">Not registered yet?</p>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
            <br />
            <br />
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                bg="white"
                placeholder="email@address.com"
                value={email}
                onChange={handleChange}
              />
              <br />
              <br />

              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                bg="white"
                value={password}
                onChange={handleChange}
              />
              {!isError ? (
                <FormHelperText>
                  <br />
                  <center>
                    <p className="center">
                      Enter the email you wish to login with.
                    </p>
                  </center>
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  <br />

                  <center>
                    <p className="center">Login credentials incorrect.</p>
                  </center>
                </FormErrorMessage>
              )}
              <Button onClick={login}>Login</Button>
            </FormControl>
          </Box>
        </div>
      </center>
    </Fade>
  );
};

export default Login;
