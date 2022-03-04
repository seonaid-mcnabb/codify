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
          <br />
          <Box
            className="Quote"
            bg="#FFE0AA"
            borderRadius="1rem"
            padding="2rem"
            width="1000px"
            maxWidth="90%"
          >
            <h1 className="center">
              {" "}
              Codify is a collaborative project by Alex Jackson, Imogen Minoli,
              and Seonaid McNabb.
            </h1>{" "}
            <p className="center">
              No matter your background, learning to program requires discipline
              and dedication, along with the ability to evaluate your own
              errors, learn from your mistakes, and sift through massive amounts
              of information in order to find code solutions that work for your
              needs.
            </p>{" "}
            <p className="center">
              We designed Codify with our own experience as bootcamp students in
              mind, hoping to provide tools to facilitate some of the practical,
              organizational needs of programmers, as well as to provide spaces
              that encourage active learning.
            </p>
            <p>
              In its current iteration, Codify has the following features:{" "}
              <ul>
                {" "}
                <li>
                  A quiz that students can use to regularly test their knowledge
                  of popular programming languages
                </li>
                <li>
                  An interactive whiteboard that can be used to visualize
                  programming concepts, take, and save notes
                </li>
                <li>
                  A personalized, searchable Q&A feature that encourages
                  students to document their own questions and answers
                  throughout their learning process, which can be reviewed
                  regularly
                </li>
                <li>
                  A searchable How-To blog where programmers can build a
                  collection of their own instructions/tutorials related to
                  coding tasks
                </li>
                <li>
                  A customizable work priorities list (particularly geared
                  towards career-changers)
                </li>
              </ul>
            </p>
          </Box>
        </center>
      </div>
    </div>
  );
};

export default Dashboard;
