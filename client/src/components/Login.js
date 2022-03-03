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
import Header from "./Header";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const isError = password === "";

  return (
    <div>
      <Box
        className="Length"
        bg="#BFE8F3"
        borderRadius="1rem"
        padding="2rem"
        maxWidth="600px"
      >
        <FormControl isInvalid={isError}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            bg="white"
            value={email}
            onChange={handleEmailChange}
          />
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            id="password"
            type="password"
            bg="white"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isError ? (
            <FormHelperText>
              <center>
                <p className="center">
                  Enter the email you wish to login with.
                </p>
              </center>
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              <center>
                <p className="center">Login credentials incorrect.</p>
              </center>
            </FormErrorMessage>
          )}
          <Button onClick={() => props.setLoginStatus(!props.loginStatus)}>
            Login
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;
