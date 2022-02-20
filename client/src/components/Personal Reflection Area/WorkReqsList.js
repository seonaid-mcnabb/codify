import React, { useState, useEffect } from "react";
import "./WorkReqsList.css";

function WorkReqsList() {
  const [mustHaves, setMustHaves] = useState([]);
  const [negotiables, setNegotiables] = useState([]);
  const [dealBreakers, setDealBreakers] = useState([]);
  const [niceToHaves, setNicetoHaves] = useState([]);

  //get all niceToHaves from backEnd
  useEffect(() => {
    fetch("http://localhost:5001/nice2haves-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNicetoHaves(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get all dealbreakers from the back-end
  useEffect(() => {
    fetch("http://localhost:5001/dealbreakers-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setDealBreakers(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Get all must-haves from back-end
  useEffect(() => {
    fetch("http://localhost:5001/must-haves-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setMustHaves(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get list of negotiables from backend
  useEffect(() => {
    fetch("http://localhost:5001/negotiables-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setNegotiables(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1 id="professional-priorities-title">Professional Priorities</h1>
      <p>
        TO-DO: add description of the purpose of this component -Think about
        making an interactive checklist Element -When user is applying /
        considering jobs, could submit how many boxes it checks and receive
        personalized advice--ie.keep looking, seems like a good fit?
      </p>

      <div id="add-to-list">
        <h1 id="addNew-title">Add a new priority:</h1>

        <form>
          <select name="priority-type" id="select-type-dropdown-menu">
            <option value="must-have">must-have</option>
            <option value="negotiable">negotiable</option>
            <option value="deal-breaker">deal-breaker</option>
            <option value="nice-to-have">nice to have</option>
          </select>
        </form>
      </div>

      <h1 id="my-list">My List</h1>
      <ul id="must-haves-list">
        <h2 id="must-haves-title">MUST-HAVES</h2>
        {mustHaves.map((e) => (
          <li> {e.must_haves} </li>
        ))}
      </ul>

      <ul id="negotiables-list">
        <h2 id="negotiables-title">NEGOTIABLES</h2>
        {negotiables.map((e) => (
          <li>{e.negotiables}</li>
        ))}
      </ul>

      <ul id="dealbreakers-list">
        <h2 id="dealbreakers-title">DEAL-BREAKERS</h2>
        {dealBreakers.map((e) => (
          <li>{e.deal_breakers}</li>
        ))}
      </ul>
      <ul id="nice2have-list">
        <h2 id="nice2have-title">NICE TO HAVE</h2>
        {niceToHaves.map((e) => (
          <li>{e.nice_to_have}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkReqsList;
