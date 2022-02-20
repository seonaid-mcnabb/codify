import React, { useState } from "react";

const StartQuiz = () => {
  let [level, setLevel] = useState("Easy");
  let [length, setLength] = useState("20");
  let [topic, setTopic] = useState("HTML");
  let [questions, setQuestions] = useState([]);

  function startQuiz(event) {
    event.preventDefault();

    fetch(
      `https://quizapi.io/api/v1/questions?tags=${topic}&limit=${length}&difficulty=${level}`,
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
        setQuestions(json); // working
      })
      .then((window.location.href = "/quiz")) //print data to console
      // .then(console.log(productData))
      .catch((err) => console.log("Request Failed", err)); // Catch errors
  }

  return (
    <div>
      <h1>I want to ace a quiz on:</h1>
      <form onSubmit={(e) => startQuiz(e)}>
        <div className="Topic">
          <label for="Topic">Topic:</label>
          <select
            id="Topic"
            name="Topic"
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="HTML">HTML</option>
            <option value="JavaScript">JavaScript</option>
            <option value="MySQL">MySQL</option>
          </select>
        </div>
        <br />
        <div className="Level">
          <label for="Level">Level:</label>
          <select
            id="Level"
            name="Level"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Easy" defaultValue>
              Easy
            </option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <br />
        <div className="Length">
          <label for="Length">Number of Questions</label>
          <br />
          <input
            type="range"
            id="Length"
            name="Length"
            min="5"
            max="20"
            step="5"
            onChange={(e) => setLength(e.target.value)}
          />

          <p>{length} questions</p>
        </div>
        <input type="submit" value="Quiz Me" />
      </form>
    </div>
  );
};

export default StartQuiz;
