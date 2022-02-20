import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

const StartQuiz = (props) => {
  // useEffect(startQuiz());
  // useEffect errors, I want questions to generate when page first loads based on default states, how do I do this?

  return (
    <div>
      <h1>I want to ace a quiz on:</h1>
      <form>
        <div className="Topic">
          <label for="Topic">Topic:</label>
          <br />
          <input
            type="radio"
            id="HTML"
            name="Topic"
            value="HTML"
            onClick={(e) => props.setTopic(e.target.value)}
          />
          <label for="html">HTML</label>
          <br />
          <input
            type="radio"
            id="JavaScript"
            name="Topic"
            value="JavaScript"
            onClick={(e) => props.setTopic(e.target.value)}
          />
          <label for="javascript">JavaScript</label>
          <br />
          <input
            type="radio"
            id="MySQL"
            name="Topic"
            value="MySQL"
            onClick={(e) => props.setTopic(e.target.value)}
          />
          <label for="MySQL">MySQL</label>
          <br />
        </div>
        <br />
        <div className="Level">
          <label for="Level">Level:</label>
          <br />
          <input
            type="radio"
            id="Easy"
            name="Level"
            value="Easy"
            onClick={(e) => props.setLevel(e.target.value)}
          />
          <label for="Easy">Easy</label>
          <br />
          <input
            type="radio"
            id="Medium"
            name="Level"
            value="Medium"
            onClick={(e) => props.setLevel(e.target.value)}
          />
          <label for="Medium">Medium</label>
          <br />
          <input
            type="radio"
            id="Hard"
            name="Level"
            value="Hard"
            onClick={(e) => props.setLevel(e.target.value)}
          />
          <label for="Hard">Hard</label>
          <br />
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
            onChange={(e) => props.setLength(e.target.value)}
          />

          <p>{props.length} questions</p>
        </div>
      </form>
      <Link to="/quiz/play">
        <input type="submit" value="Quiz Me " />
      </Link>
    </div>
  );
};

export default StartQuiz;
