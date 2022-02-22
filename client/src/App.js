import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< HEAD
import Whiteboard from "./components/whiteboard/Whiteboard";
=======
import Whiteboard from "./components/whiteboard/Whiteboard.js";
>>>>>>> ee547ada41020c4608ef46d2f7290fb512b6c92e
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

  return (
    <div className="App">
      <Header />

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

      <Footer />
    </div>
  );
}

export default App;
