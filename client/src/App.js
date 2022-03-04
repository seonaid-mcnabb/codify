import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Whiteboard from "./components/whiteboard/Whiteboard2.js";
import Quiz from "./components/quiz/Quiz";
import Play from "./components/quiz/Play";
import WorkReqsList from "./components/Personal Reflection Area/WorkReqsList";
import MyQandAs from "./components/Backup Brain/MyQandAs";
import Results from "./components/quiz/Results";
import { ChakraProvider } from "@chakra-ui/react";
import DocumentationHomePage from "./components/Seonaid Components Navigation/DocumentationHomePage";
import ReflectionAreaHomePage from "./components/Seonaid Components Navigation/ReflectionAreaHomePage";
import HowTos from "./components/Backup Brain/HowTos";
import Dashboard from "./components/Dashboard";
//comment to add push
function App() {
  let [level, setLevel] = useState("Easy");
  let [length, setLength] = useState("20");
  let [topic, setTopic] = useState("HTML");
  let [questions, setQuestions] = useState([]);
  let [userAnswersArray, setUserAnswersArray] = useState([]);
  let [allAnswers, setAllAnswers] = useState([]);
  let [quizStatus, setQuizStatus] = useState("Playing");
  let [tabIndex, setTabIndex] = useState(0);
  let [hide, setHide] = useState(false);

  let [loginStatus, setLoginStatus] = useState(false);

  function getToken() {
    if (localStorage.getItem("token")) {
      // console.log("got token yay!");
      setLoginStatus(true);
    } else {
      // console.log("no token :(");
      setLoginStatus(false);
    }
  }

  useEffect(() => {
    getToken();
  }, localStorage);

  const pathname = window.location.pathname;

  return (
    <div className="App">
      {/* <Header
        setTabIndex={setTabIndex}
        tabIndex={tabIndex}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        getToken={getToken}
      /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
        <Route
          path="/register"
          element={
            <SignUp
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
        <Route
          path="/whiteboard"
          element={
            <Whiteboard
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
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
              getToken={getToken}
              setTabIndex={setTabIndex}
              quizStatus={quizStatus}
              setQuizStatus={setQuizStatus}
              userAnswersArray={userAnswersArray}
              setUserAnswersArray={setUserAnswersArray}
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
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
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
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />

        {/*Routes to links on nav bar Seonaid's components*/}
        <Route
          path="/documentation-navigation"
          element={
            <DocumentationHomePage
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
        <Route
          path="/reflection-area-navigation"
          element={
            <ReflectionAreaHomePage
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />

        {/*Seonaids Component Routes--For The Reflection Area */}
        <Route
          path="/joblist"
          element={
            <WorkReqsList
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />

        {/*Seonaids Component Routes--For The Documentation Area */}
        <Route
          path="/qandas"
          element={
            <MyQandAs
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
        <Route
          path="/how-tos"
          element={
            <HowTos
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              getToken={getToken}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
