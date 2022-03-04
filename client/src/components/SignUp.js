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
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

import Header from "./Header";
const axios = require("axios").default;

const SignUp = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const isError = credentials === "";

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const register = async () => {
    try {
      const { data } = await axios("http://localhost:5000/users/register", {
        method: "POST",
        data: credentials,
      });

      //store it locally

      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <Header
        tabIndex={0}
        getToken={props.getToken}
        loginStatus={props.loginStatus}
        setLoginStatus={props.setLoginStatus}
      />
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
              <p className="center">Already registed?</p>
              <Button>Login</Button>
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
                      <p className="center">Please enter a valid email.</p>
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
                <Button onClick={register}>Sign Up</Button>
              </FormControl>
            </Box>
          </div>
        </center>
      </Fade>
    </div>
  );
};

export default SignUp;
