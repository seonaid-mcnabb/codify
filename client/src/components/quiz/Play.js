import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";
import Header from "../Header";
import Footer from "../Footer";
import { Box, Button, Center, Radio, RadioGroup } from "@chakra-ui/react";

const Play = (props) => {
  useEffect(() => {
    if (props.quizStatus === "Finished") {
      console.log("Finished");
    } else {
      startQuiz();
    }
  }, props);

  let [currentQuestion, setCurrentQuestion] = useState(1);
  let [currentAnswer, setCurrentAnswer] = useState("");

  function startQuiz() {
    fetch(
      `https://quizapi.io/api/v1/questions?tags=${props.topic}&limit=${props.length}&difficulty=${props.level}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "uN1cyzx8Ye37vc3qgObA0VZCTfxmdpRYz8kkEQJd",
        },
      }
    )
      .then((response) => response.json()) // convert to json
      .then((json) => {
        console.log(json);
        props.setQuestions(json); // working
      })
      // .then(console.log(productData))
      .catch((err) => console.log("Request Failed", err)); // Catch errors
  }

  function nextQuestion(event) {
    event.preventDefault();
    props.setUserAnswersArray([...props.userAnswersArray, currentAnswer]);
    if (currentQuestion == props.length) {
      props.setQuizStatus("Finished");
      console.log("Quiz Finished");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  // function previousQuestion(event) {
  //   event.preventDefault();
  //   if (currentQuestion == 1) {
  //     console.log("First Question");
  //   } else {
  //     setCurrentQuestion(currentQuestion - 1);
  //   }
  // }

  return (
    <div>
      {/* <Header /> */}
      <center>
        {props.quizStatus == "Playing" ? (
          <div className="page">
            <Center display="block" alignItems="center">
              <Box
                alignItems="flex"
                className="Questions"
                bg="#BFE8F3"
                textAlign="left"
                borderRadius="1rem"
                padding="2rem"
                width="600px"
                maxWidth="90%"
              >
                {!props.questions[0] ? (
                  "Starting..."
                ) : (
                  <form
                    id={currentQuestion}
                    name={currentQuestion}
                    onSubmit={(e) => nextQuestion(e)}
                  >
                    <h1 id={currentQuestion} name={currentQuestion}>
                      {props.questions[currentQuestion - 1].question}
                    </h1>
                    <RadioGroup
                      onChange={setCurrentAnswer}
                      value={currentAnswer}
                    >
                      {/* ANSWER A */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_a ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer A"
                          colorScheme="orange"
                          bg="white"
                          value="answer_a"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_a
                          }
                        </Radio>
                      )}

                      {/* ANSWER B */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_b ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer B"
                          colorScheme="orange"
                          bg="white"
                          value="answer_b"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_b
                          }
                        </Radio>
                      )}
                      {/* ANSWER C */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_c ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer C"
                          colorScheme="orange"
                          bg="white"
                          value="answer_c"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_c
                          }
                        </Radio>
                      )}
                      {/* ANSWER D */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_d ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer D"
                          colorScheme="orange"
                          bg="white"
                          value="answer_d"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_d
                          }
                        </Radio>
                      )}
                      {/* ANSWER E */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_e ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer E"
                          colorScheme="orange"
                          bg="white"
                          value="answer_e"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_e
                          }
                        </Radio>
                      )}
                      {/* ANSWER F */}
                      {!props.questions[currentQuestion - 1].answers
                        .answer_f ? (
                        ""
                      ) : (
                        <Radio
                          name="Answer F"
                          colorScheme="orange"
                          bg="white"
                          value="answer_f"
                          display="flex"
                          paddingLeft="10%"
                        >
                          {
                            props.questions[currentQuestion - 1].answers
                              .answer_f
                          }
                        </Radio>
                      )}
                    </RadioGroup>
                    {/* conditionally render a finish quiz button that takes you to a results page and hide submit button if the currentQuestion == props.length */}
                    <br />
                    {/* {currentQuestion == 1 ? (
                ""
              ) : (
                <input
                  type="button"
                  value="Back"
                  onClick={(e) => previousQuestion(e)}
                />
              )} */}

                    {currentQuestion < props.length ? (
                      <center>
                        <Button textAlign="center">
                          <input type="submit" value="Next" />
                        </Button>
                      </center>
                    ) : (
                      <center>
                        <Button>
                          <input
                            type="submit"
                            value="Submit Answers"
                            textAlign="center"
                          />
                        </Button>
                      </center>
                    )}
                  </form>
                )}{" "}
                <p className="right bottom">
                  Question {currentQuestion} of {props.length}
                </p>
              </Box>
            </Center>
          </div>
        ) : (
          <div>
            <p className="center">
              How do you think you did? Well, now it's time to find out!
            </p>
            <Button bg="#BFE8F3" color="orange" padding="4rem">
              <Link to="/quiz/results">Get my results!</Link>
            </Button>
          </div>
        )}
        <Footer />
      </center>
    </div>
  );
};

export default Play;
