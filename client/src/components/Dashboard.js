import React, { useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus === false) {
      navigate(`/login`);
    }
  }, props);

  if (props.loginStatus === false) {
    navigate(`/login`);
  }
  return (
    <div>
      <Header
        tabIndex={0}
        getToken={props.getToken}
        loginStatus={props.loginStatus}
        setLoginStatus={props.setLoginStatus}
      />
      <div>
        <center>
          <Box
            className="Quote"
            bg="#BFE8F3"
            borderRadius="1rem"
            padding="2rem"
            width="600px"
            maxWidth="90%"
          >
            <h1>
              “Tell me and I forget, teach me and I may remember, involve me and
              I learn” (Benjamin Franklin)
            </h1>
          </Box>
        </center>
      </div>
    </div>
  );
};

export default Dashboard;
