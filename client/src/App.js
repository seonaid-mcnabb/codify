import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Whiteboard from "./components/whiteboard/Whiteboard2.js";
import Quiz from "./components/quiz/Quiz";
import Play from "./components/quiz/Play";
import WorkReqsList from "./components/Personal Reflection Area/WorkReqsList";
import MyQandAs from "./components/Backup Brain/MyQandAs";
import Results from "./components/quiz/Results";
//comment to add push
function App() {
  let [level, setLevel] = useState("Easy");
  let [length, setLength] = useState("20");
  let [topic, setTopic] = useState("HTML");
  let [questions, setQuestions] = useState([]);
  let [userAnswersArray, setUserAnswersArray] = useState([]);
  let [allAnswers, setAllAnswers] = useState([]);
  let [quizStatus, setQuizStatus] = useState("Playing");

  const pathname = window.location.pathname;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route
          path="/quiz"
          element={
            <Quiz
              level={level}
              length={length}
              topic={topic}
              questions={questions}
              setLevel={setLevel}
              setLength={setLength}
              setTopic={setTopic}
            />
          }
        />
        <Route
          path="/quiz/play"
          element={
            <Play
              level={level}
              length={length}
              topic={topic}
              questions={questions}
              setQuestions={setQuestions}
              userAnswersArray={userAnswersArray}
              setUserAnswersArray={setUserAnswersArray}
              quizStatus={quizStatus}
              setQuizStatus={setQuizStatus}
            />
          }
        />
        <Route
          path="/quiz/results"
          element={
            <Results
              level={level}
              length={length}
              topic={topic}
              questions={questions}
              setQuestions={setQuestions}
              userAnswersArray={userAnswersArray}
              quizStatus={quizStatus}
              setQuizStatus={setQuizStatus}
            />
          }
        />
        {/*Seonaids Component Routes--For Testing Purposes */}
        <Route path="/joblist" element={<WorkReqsList />} />
        <Route path="/qandas" element={<MyQandAs />} />
      </Routes>

      {pathname == "/whiteboard" ? "" : <Footer />}
    </div>
  );
}

export default App;
