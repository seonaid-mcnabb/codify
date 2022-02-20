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

  return (
    <div>
      <h1>Quiz</h1>
      <p>Number of questions: {props.length}</p>

      {!props.questions[0] ? (
        "Loading..."
      ) : (
        <form>{props.questions[currentQuestion - 1].question}</form>
      )}
    </div>
  );
};

export default Play;
