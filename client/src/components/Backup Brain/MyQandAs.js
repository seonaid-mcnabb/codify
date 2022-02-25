import e from "cors";
import React, { useState, useEffect } from "react";
import "./MyQandAs.css";

//This component should:
//Have filter by tag search functionality
//Have full text searchability
//Display your own q&as visually on cards: question on front, on click displays answer
//have an input form that accepts question, answer, and tag

//TODO
//Fix display of flipcards
//Add tag input area
//associate tags with tag table ids

function MyQandAs() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [tag, setTag] = useState("");

  const handleNewQuestion = (e) => {
    let question = e.target.value;
    setNewQuestion(question);
  };
  const handleNewAnswer = (e) => {
    let answer = e.target.value;
    setNewAnswer(answer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/q-and-a", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newQuestion,
        answer: newAnswer,
        tag_id: "1",
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setQuestionsAndAnswers(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Get all the q&as from back-end
  useEffect(() => {
    fetch("http://localhost:5001/q-and-as-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setQuestionsAndAnswers(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Q & As</h1>
      <p>
        Learning to code is a lot about asking the right questions, and then
        interpreting the many, many answers available to you in a way that makes
        sense for you. Use this area to build your own collection of Q&As that
        you can review, re-visit, and search through before turning to
        StackOverflow for an answer that you may already have.
      </p>
      <div id="newQandAform">
        <h1>Add a new Q & A:</h1>
        <form>
          <h2> Question: </h2>
          <input name="question" onChange={handleNewQuestion}></input>
          <h2> Answer: </h2>
          <input name="answer" onChange={handleNewAnswer}></input>
          <h2>Tag: </h2>
          <input name="tag"></input>
          <button onClick={handleSubmit}>Add to my collection</button>
        </form>
      </div>

      <div id="searchBar">
        <h1> Search previous questions </h1>
        <input name="search" value="enter your search terms"></input>{" "}
        <button> search</button>
      </div>

      {/*AREA TO DISPLAY Q&AS on FLIPCARDS */}
      <h1 class="card-title">Q&A Collection</h1>
      {questionsAndAnswers.map((e) => (
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h2>{e.question}</h2>
            </div>
            <div class="flip-card-back">
              <h2>{e.answer}</h2>
              <button>DELETE</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyQandAs;
