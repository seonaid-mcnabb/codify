import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";
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
} from "@chakra-ui/react";

const StartQuiz = (props) => {
  // useEffect(startQuiz());
  // useEffect errors, I want questions to generate when page first loads based on default states, how do I do this?

  return (
    <div>
      <Header />
      {props.loginStatus ? (
        <Center color="orange">
          <form>
            <h1>Time to ace a quiz!</h1>
            <div className="Topic">
              <h1>Topic:</h1>
              <RadioGroup onChange={props.setTopic} value={props.topic}>
                <Stack>
                  <Radio
                    name="topc"
                    colorScheme="orange"
                    value="HTML"
                    defaultChecked
                  >
                    HTML
                  </Radio>
                  <Radio name="topc" colorScheme="orange" value="JavaScript">
                    JavaScript
                  </Radio>
                  <Radio name="topc" colorScheme="orange" value="MySQL">
                    MySQL
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>
            <br />
            <h1>Level:</h1>

            <RadioGroup onChange={props.setLevel} value={props.level}>
              <Stack>
                <Radio
                  name="level"
                  colorScheme="orange"
                  value="Easy"
                  defaultChecked
                >
                  Easy
                </Radio>
                <Radio name="level" colorScheme="orange" value="Medium">
                  Medium
                </Radio>
                <Radio name="level" colorScheme="orange" value="Hard">
                  Hard
                </Radio>
              </Stack>
            </RadioGroup>
            <br />
            <div className="Length">
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
                maxWidth="80%"
                alignContent="center"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </div>
            <Link to="/quiz/play">
              <Button type="submit" value="Quiz Me">
                Quiz Me
              </Button>
            </Link>
          </form>
        </Center>
      ) : (
        <Link to="/login">
          You must be logged in to see this page, login here:{" "}
          <Button>Login</Button>
        </Link>
      )}
      <Footer />
    </div>
  );
};

export default StartQuiz;
