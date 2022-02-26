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
import { ChakraProvider } from "@chakra-ui/react";
import DocumentationHomePage from "./components/Backup Brain/DocumentationHomePage";
import ReflectionAreaHomePage from "./components/Backup Brain/ReflectionAreaHomePage";

//comment to add push
function App() {
  let [level, setLevel] = useState("Easy");
  let [length, setLength] = useState("20");
  let [topic, setTopic] = useState("HTML");
  let [questions, setQuestions] = useState([]);
  let [userAnswersArray, setUserAnswersArray] = useState([]);
  let [allAnswers, setAllAnswers] = useState([]);
  let [quizStatus, setQuizStatus] = useState("Playing");
  let [loginStatus, setLoginStatus] = useState(false);

  const pathname = window.location.pathname;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
          }
        />
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
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
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

        {/*Routes to links on nav bar Seonaid's components*/}
        <Route
          path="/documentation-navigation"
          element={<DocumentationHomePage />}
        />
        <Route
          path="/reflection-area-navigation"
          element={<ReflectionAreaHomePage />}
        />

        {/*Seonaids Component Routes--For The Documentation Area */}
        <Route path="/joblist" element={<WorkReqsList />} />

        {/*Seonaids Component Routes--For The Reflection Area */}
        <Route path="/qandas" element={<MyQandAs />} />
      </Routes>
    </div>
  );
}

export default App;
