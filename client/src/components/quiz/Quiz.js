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
          {/* convert this to a radio */}

          <select
            id="Topic"
            name="Topic"
            onChange={(e) => props.setTopic(e.target.value)}
          >
            <option value="HTML">HTML</option>
            <option value="JavaScript">JavaScript</option>
            <option value="MySQL">MySQL</option>
          </select>
        </div>
        <br />
        <div className="Level">
          <label for="Level">Level:</label>
          {/* convert this to a radio */}
          <select
            id="Level"
            name="Level"
            onChange={(e) => props.setLevel(e.target.value)}
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
