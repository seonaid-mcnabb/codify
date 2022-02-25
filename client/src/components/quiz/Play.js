import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";
import Header from "../Header";
import Footer from "../Footer";

const Play = (props) => {
  useEffect(() => {
    startQuiz();
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
      <Header />

      <h1>Quiz</h1>

      {props.quizStatus == "Playing" ? (
        <div>
          <p>
            Question {currentQuestion} of {props.length}
          </p>
          {!props.questions[0] ? (
            "Starting..."
          ) : (
            <form
              id={currentQuestion}
              name={currentQuestion}
              onSubmit={(e) => nextQuestion(e)}
            >
              <h6 id={currentQuestion} name={currentQuestion}>
                {props.questions[currentQuestion - 1].question}
              </h6>
              {/* ANSWER A */}
              {!props.questions[currentQuestion - 1].answers.answer_a ? (
                ""
              ) : (
                <div className="Answer A">
                  <input
                    type="radio"
                    id="Answer A"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_a
                    }
                    onClick={(e) => setCurrentAnswer("answer_a")}
                  />
                  <label for="Answer A">
                    {props.questions[currentQuestion - 1].answers.answer_a}
                  </label>
                  <br />
                </div>
              )}

              {/* ANSWER B */}
              {!props.questions[currentQuestion - 1].answers.answer_b ? (
                ""
              ) : (
                <div className="Answer B">
                  <input
                    type="radio"
                    id="Answer B"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_b
                    }
                    onClick={(e) => setCurrentAnswer("answer_b")}
                  />
                  <label for="Answer B">
                    {props.questions[currentQuestion - 1].answers.answer_b}
                  </label>
                  <br />
                </div>
              )}
              {/* ANSWER C */}
              {!props.questions[currentQuestion - 1].answers.answer_c ? (
                ""
              ) : (
                <div className="Answer C">
                  <input
                    type="radio"
                    id="Answer C"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_c
                    }
                    onClick={(e) => setCurrentAnswer("answer_c")}
                  />
                  <label for="Answer C">
                    {props.questions[currentQuestion - 1].answers.answer_c}
                  </label>
                  <br />
                </div>
              )}
              {/* ANSWER D */}
              {!props.questions[currentQuestion - 1].answers.answer_d ? (
                ""
              ) : (
                <div className="Answer D">
                  <input
                    type="radio"
                    id="Answer D"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_d
                    }
                    onClick={(e) => setCurrentAnswer("answer_d")}
                  />
                  <label for="Answer D">
                    {props.questions[currentQuestion - 1].answers.answer_d}
                  </label>{" "}
                  <br />
                </div>
              )}
              {/* ANSWER E */}
              {!props.questions[currentQuestion - 1].answers.answer_e ? (
                ""
              ) : (
                <div className="Answer E">
                  <input
                    type="radio"
                    id="Answer E"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_e
                    }
                    onClick={(e) => setCurrentAnswer("answer_e")}
                  />
                  <label for="Answer E">
                    {props.questions[currentQuestion - 1].answers.answer_e}
                  </label>{" "}
                  <br />
                </div>
              )}
              {/* ANSWER F */}
              {!props.questions[currentQuestion - 1].answers.answer_f ? (
                ""
              ) : (
                <div className="Answer F">
                  <input
                    type="radio"
                    id="Answer F"
                    name={currentQuestion}
                    value={
                      props.questions[currentQuestion - 1].answers.answer_f
                    }
                    onClick={(e) => setCurrentAnswer("answer_f")}
                  />
                  <label for="Answer F">
                    {props.questions[currentQuestion - 1].answers.answer_f}
                  </label>{" "}
                  <br />
                </div>
              )}
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
                <input type="submit" value="Next" />
              ) : (
                <input type="submit" value="Submit Answers" />
              )}
            </form>
          )}{" "}
        </div>
      ) : (
        <Link to="/quiz/results">Get my results!</Link>
      )}
      <Footer />
    </div>
  );
};

export default Play;
