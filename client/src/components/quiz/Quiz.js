import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Quiz.css";
import Fade from "react-reveal/Fade";
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Center,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";

const StartQuiz = (props) => {
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
      {/* <Header setTabIndex={props.setTabIndex} tabIndex={props.tabIndex} /> */}
      <center>
        <Fade bottom>
          <form className="page">
            <Center display="block" alignItems="center">
              <h1>Time to ace a quiz!</h1>
              <Box
                alignItems="flex"
                className="Topic"
                bg="#BFE8F3"
                borderRadius="1rem"
                padding="2rem"
                width="600px"
                maxWidth="90%"
              >
                <h1>Topic:</h1>
                <RadioGroup onChange={props.setTopic} value={props.topic}>
                  <Stack>
                    <Radio
                      name="topic"
                      colorScheme="orange"
                      bg="white"
                      value="HTML"
                      defaultChecked
                    >
                      HTML
                    </Radio>
                    <Radio
                      name="topc"
                      colorScheme="orange"
                      value="JavaScript"
                      bg="white"
                    >
                      JavaScript
                    </Radio>
                    <Radio
                      name="topc"
                      colorScheme="orange"
                      value="MySQL"
                      bg="white"
                    >
                      MySQL
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <br />
              <Box
                className="Level"
                bg="#BFE8F3"
                borderRadius="1rem"
                padding="2rem"
                width="600px"
                maxWidth="90%"
              >
                <h1>Level:</h1>

                <RadioGroup onChange={props.setLevel} value={props.level}>
                  <Stack>
                    <Radio
                      name="level"
                      colorScheme="orange"
                      bg="white"
                      value="Easy"
                      defaultChecked
                    >
                      Easy
                    </Radio>
                    <Radio
                      name="level"
                      colorScheme="orange"
                      bg="white"
                      value="Medium"
                    >
                      Medium
                    </Radio>
                    <Radio
                      name="level"
                      colorScheme="orange"
                      bg="white"
                      value="Hard"
                    >
                      Hard
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <br />
              <Box
                className="Length"
                bg="#BFE8F3"
                borderRadius="1rem"
                padding="2rem"
                width="600px"
                maxWidth="90%"
              >
                <h1>Number of questions:</h1>
                <Slider
                  defaultValue={20}
                  min={5}
                  max={20}
                  step={5}
                  id="Length"
                  name="Length"
                  aria-label="Number of quiz questions"
                  colorScheme="orange"
                  onChangeEnd={(value) => props.setLength(value)}
                  alignContent="center"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <br />

                <p className="center">{props.length} questions</p>

                <Link to="/quiz/play">
                  <Button type="submit" value="Quiz Me">
                    Quiz Me
                  </Button>
                </Link>
              </Box>
            </Center>
          </form>
        </Fade>

        <Footer />
      </center>
    </div>
  );
};

export default StartQuiz;
