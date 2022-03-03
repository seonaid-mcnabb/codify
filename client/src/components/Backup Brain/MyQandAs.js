import e from "cors";
import React, { useState, useEffect } from "react";
import "./MyQandAs.css";
import Header from "../Header.js";
import { Button } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
import Fade from "react-reveal/Fade";

//This component should:
//Have full text searchability
//Display your own q&as visually on cards: question on front, displays on back
//have an input form that accepts question, answer, and tag

function MyQandAs() {
  //sets and stores all the Q&As
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  //sets a user input question
  const [newQuestion, setNewQuestion] = useState("");
  //sets user input answer
  const [newAnswer, setNewAnswer] = useState("");
  //sets user input search terms
  const [searchTerms, setSearchTerms] = useState("");
  //state to manipulate whether search results are being shown or not
  const [displaySearchResults, setDisplaySearchesults] = useState(false);
  const [loading, setLoading] = useState(true);

  //handles user input questions
  const handleNewQuestion = (e) => {
    let question = e.target.value;
    setNewQuestion(question);
  };

  //handles user-input answer
  const handleNewAnswer = (e) => {
    let answer = e.target.value;
    setNewAnswer(answer);
  };

  //handles user input search terms
  const handleSearch = (e) => {
    let searchTerm = e.target.value;
    setSearchTerms(searchTerm);
  };

  //add a new q&a to the list
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
        tag_id: 1,
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setNewQuestion("");
        setNewAnswer("");
        setQuestionsAndAnswers(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a q&a card
  const deleteQA = (e) => {
    fetch(`http://localhost:5001/q-and-a/${e.id}`, {
      method: "delete",
    })
      .then((res) => {
        console.log(res);
        console.log(e.id);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setQuestionsAndAnswers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //show the results of the users search
  const showSearchResults = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/q-and-as-list-search/${searchTerms}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setSearchTerms("");
        setQuestionsAndAnswers(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //go back to the full list view
  const showFullList = () => {
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
  };

  //Get all the q&as from back-end on load
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
        setLoading(false);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* added to prevent no results page from flashing on load, could be customized with transitions */}
      {loading ? null : null}
      {/*Sidebar menu and input forms for new q&as*/}
      <div className="row">
        <div className="col-lg-3">
          <div className="q-and-a-menu">
            <div id="newQandAform">
              <form className="newQandAform">
                <h2 className="q-a-input-title"> Question: </h2>
                <textarea
                  className="q-a-input"
                  name="question"
                  value={newQuestion}
                  onChange={handleNewQuestion}
                ></textarea>
                <h2 className="q-a-input-title"> Answer: </h2>
                <textarea
                  className="q-a-input"
                  name="answer"
                  value={newAnswer}
                  onChange={handleNewAnswer}
                ></textarea>{" "}
                <br></br>
                <button className="q-a-button" onClick={handleSubmit}>
                  Add to my collection
                </button>
              </form>
            </div>

            {/*Sidebar menu search form*/}
            <div className="newQandAform" id="searchBar">
              <h1 className="q-a-input-title"> Search: </h1>
              <input
                className="q-a-input"
                name="search"
                value={searchTerms}
                onChange={handleSearch}
              ></input>{" "}
              <button className="q-a-button" onClick={showSearchResults}>
                {" "}
                search
              </button>
              <button className="q-a-button" onClick={showFullList}>
                show all cards
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          {/*My cards area where collection is displayed  */}
          {questionsAndAnswers.length === 0 && !loading ? (
            <Fade left>
              (
              <h1 className="collection-title">
                Whoops! Nothing to see here! Keep adding questions
              </h1>
              ){" "}
            </Fade>
          ) : (
            <h1 className="collection-title"> My Cards</h1>
          )}
          {/*Title toggled based on length of collection */}
          <Fade right>
            <div className="q-and-a-main">
              {/*What will be displayed if there are no cards or if search comes up empty.. currently just a random image from the internet */}
              {questionsAndAnswers.length === 0 && !loading ? (
                <Fade right>
                  <div>
                    <img
                      className="no-results-image"
                      alt="sad computer"
                      src="https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos1801/yupiramos180114560.jpg"
                    ></img>
                  </div>
                </Fade>
              ) : (
                questionsAndAnswers.map((e) => (
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h2>{e.question}</h2>
                      </div>
                      <div class="flip-card-back">
                        <h2>{e.answer}</h2>
                        <Button
                          className="deleteQa"
                          leftIcon={<MdOutlineDelete />}
                          color="#ee6327"
                          size="lg"
                          background="transparent"
                          variant="ghost"
                          _hover="blue"
                          onClick={() => deleteQA(e)}
                        >
                          {" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default MyQandAs;
