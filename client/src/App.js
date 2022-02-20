import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Whiteboard from "./components/whiteboard/Whiteboard.js";
import StartQuiz from "./components/quiz/StartQuiz";
import Quiz from "./components/quiz/Quiz";

//comment to add push
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/start-quiz" element={<StartQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
