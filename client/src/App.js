import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Whiteboard from "./components/whiteboard/Whiteboard.js";
import WorkReqsList from "./components/Personal Reflection Area/WorkReqsList";

//comment to add push
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whiteboard" element={<Whiteboard />} />

        {/*Seonaids Component Routes--For Testing Purposes */}
        <Route path="/joblist" element={<WorkReqsList />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
