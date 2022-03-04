import React from "react";
import { Button, Box } from "@chakra-ui/react";
import Login from "./Login";

const Dashboard = (props) => {
  return (
    <div>
      {props.loginStatus ? (
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
                “Tell me and I forget, teach me and I may remember, involve me
                and I learn” (Benjamin Franklin)
              </h1>
            </Box>
          </center>
        </div>
      ) : (
        <center>
          <Login />
        </center>
      )}
    </div>
  );
};

export default Dashboard;
