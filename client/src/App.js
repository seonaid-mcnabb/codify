import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Whiteboard from "./components/whiteboard/Whiteboard.js";


//comment to add push
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
