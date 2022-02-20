import React, { useEffect, useState } from "react";
import "./Quiz.css";

const Play = (props) => {
  useEffect(() => {
    startQuiz();
  }, props);

  let [currentQuestion, setCurrentQuestion] = useState(1);

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
    if (currentQuestion == props.length) {
      console.log("Quiz Finished");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <div>
      <h1>Quiz</h1>
      <p>Number of questions: {props.length}</p>

      {!props.questions[0] ? (
        "Starting..."
      ) : (
        <form onSubmit={(e) => nextQuestion(e)}>
          <h6>{props.questions[currentQuestion - 1].question}</h6>
          <select
            id="Level"
            name="Level"
            onChange={(e) => props.setLevel(e.target.value)}
          >
            {!props.questions[currentQuestion - 1].answers.answer_a ? (
              ""
            ) : (
              <option value="Answer A" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_a}
              </option>
            )}
            {!props.questions[currentQuestion - 1].answers.answer_b ? (
              ""
            ) : (
              <option value="Answer B" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_b}
              </option>
            )}
            {!props.questions[currentQuestion - 1].answers.answer_c ? (
              ""
            ) : (
              <option value="Answer C" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_c}
              </option>
            )}
            {!props.questions[currentQuestion - 1].answers.answer_d ? (
              ""
            ) : (
              <option value="Answer D" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_d}
              </option>
            )}
            {!props.questions[currentQuestion - 1].answers.answer_e ? (
              ""
            ) : (
              <option value="Answer E" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_e}
              </option>
            )}
            {!props.questions[currentQuestion - 1].answers.answer_f ? (
              ""
            ) : (
              <option value="Answer F" defaultValue>
                {props.questions[currentQuestion - 1].answers.answer_f}
              </option>
            )}
          </select>
          {/* conditionally render a finish quiz button that takes you to a results page and hide submit button if the currentQuestion == props.length */}
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};

export default Play;
