import React, { useState, useEffect } from "react";
import "./WorkReqsList.css";
import Header from "../Header.js";
import { Button, Checkbox } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
import Fade from "react-reveal";
import { useNavigate } from "react-router-dom";

function WorkReqsList(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus === false) {
      navigate(`/login`);
    }
  }, props);

  if (props.loginStatus === false) {
    navigate(`/login`);
  }
  const [mustHaves, setMustHaves] = useState([]);
  const [negotiables, setNegotiables] = useState([]);
  const [dealBreakers, setDealBreakers] = useState([]);
  const [niceToHaves, setNicetoHaves] = useState([]);
  const [checkListView, setChecklistView] = useState(false);

  //STATES TO RECORD FORM INPUT
  const [type, setType] = useState("must-have");
  const [description, setDescription] = useState("");

  //change state to checklist view
  function showCheckList() {
    setChecklistView(!checkListView); //toggle true & false
  }

  //record and set the input description
  function handleInputChange(e) {
    const value = e.target.value;
    setDescription(value);
  }

  //record and set the priority type
  function handleInputSelection(e) {
    const value = e.target.value;
    setType(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "must-have") {
      fetch("/must-have", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          must_haves: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setDescription("");
          setMustHaves(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "negotiable") {
      fetch("/negotiable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          negotiables: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setDescription("");
          setNegotiables(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "deal-breaker") {
      fetch("/dealbreaker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deal_breakers: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setDescription("");
          setDealBreakers(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === "nice-to-have") {
      fetch("/nice2have", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nice_to_have: description,
        }),
      })
        .then((res) => res.json()) //First transform the JSON to a Javascript object
        .then((json) => {
          setDescription("");
          setNicetoHaves(json); //update the list
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //delete a must-have
  const deleteMustHave = (e) => {
    fetch(`http://localhost:5001/must-have/${e.id}`, {
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
        setMustHaves(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a negotiable
  const deleteNegotiable = (e) => {
    fetch(`http://localhost:5001/negotiable/${e.id}`, {
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
        setNegotiables(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete a deal-breaker

  const deleteDealbreaker = (e) => {
    fetch(`http://localhost:5001/dealbreaker/${e.id}`, {
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
        setDealBreakers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //delete a nice2have
  const deleteNice2have = (e) => {
    fetch(`http://localhost:5001/nice2have/${e.id}`, {
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
        setNicetoHaves(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get all niceToHaves from backEnd
  useEffect(() => {
    fetch("/nice2haves-list")
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
    fetch("/dealbreakers-list")
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
    fetch("/must-haves-list")
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
    fetch("/negotiables-list")
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
      <Header
        tabIndex={3}
        getToken={props.getToken}
        loginStatus={props.loginStatus}
        setLoginStatus={props.setLoginStatus}
      />

      <h1 className="priorities-title" id="professional-priorities-title">
        Professional Priorities
      </h1>
      <div className="row">
        <Fade bottom>
          <div className="col-lg-4">
            <div className="priorities-menu">
              <div className="add-to-list">
                <form className="add-priorities-form">
                  <h2 className="form-header">Select Type:</h2>
                  <select
                    className="priorities-input"
                    onChange={handleInputSelection}
                    name="priority-type"
                    id="select-type-dropdown-menu"
                  >
                    <option value="must-have">must-have</option>
                    <option value="negotiable">negotiable</option>
                    <option value="deal-breaker">deal-breaker</option>
                    <option value="nice-to-have">nice to have</option>
                  </select>
                  <h2 className="form-header">Add a description:</h2>
                  <input
                    className="priorities-input"
                    id="priority-description-input"
                    value={description}
                    onChange={handleInputChange}
                  ></input>
                  <br />{" "}
                  {/*<--remove this later by styling so that submit button is on next line */}
                  <button onClick={handleSubmit} className="priorities-button">
                    SUBMIT
                  </button>
                </form>
                {checkListView ? (
                  <div>
                    <h2 className="form-header"> Go back: </h2>
                    <button
                      className="priorities-button"
                      onClick={showCheckList}
                    >
                      LIST VIEW{" "}
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="form-header">Got an offer? </h2>
                    <button
                      className="priorities-button"
                      onClick={showCheckList}
                    >
                      CHECKLIST{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fade>

        <div className="col-lg-8">
          <div className="priorities-main">
            {!checkListView ? (
              <Fade left>
                <div className="priorities-list">
                  <ul id="must-haves-list">
                    <h2 className="list-header" id="must-haves-title">
                      MUST-HAVES
                    </h2>
                    {mustHaves.map((e) => (
                      <li className="priorities-list-items">
                        {" "}
                        {e.must_haves}{" "}
                        <Button
                          onClick={() => deleteMustHave(e)}
                          leftIcon={<MdOutlineDelete />}
                          color="#0090C3"
                          size="xs"
                          padding="0px"
                          variant="ghost"
                        >
                          {" "}
                        </Button>
                      </li>
                    ))}
                  </ul>

                  <ul id="negotiables-list">
                    <h2 className="list-header" id="negotiables-title">
                      NEGOTIABLES
                    </h2>
                    {negotiables.map((e) => (
                      <li className="priorities-list-items">
                        {e.negotiables}
                        <Button
                          onClick={() => deleteNegotiable(e)}
                          leftIcon={<MdOutlineDelete />}
                          color="#0090C3"
                          size="xs"
                          variant="ghost"
                        >
                          {" "}
                        </Button>
                      </li>
                    ))}
                  </ul>

                  <ul id="dealbreakers-list">
                    <h2 className="list-header" id="dealbreakers-title">
                      DEAL-BREAKERS
                    </h2>
                    {dealBreakers.map((e) => (
                      <li className="priorities-list-items">
                        {e.deal_breakers}{" "}
                        <Button
                          onClick={() => deleteDealbreaker(e)}
                          leftIcon={<MdOutlineDelete />}
                          color="#0090C3"
                          size="xs"
                          variant="ghost"
                        >
                          {" "}
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <ul id="nice2have-list">
                    <h2 className="list-header" id="nice2have-title">
                      NICE TO HAVE
                    </h2>
                    {niceToHaves.map((e) => (
                      <li className="priorities-list-items">
                        {e.nice_to_have}{" "}
                        <Button
                          onClick={() => deleteNice2have(e)}
                          leftIcon={<MdOutlineDelete />}
                          color="#0090C3"
                          size="xs"
                          variant="ghost"
                        >
                          {" "}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ) : (
              <Fade bottom>
                <div className="priorities-list">
                  <h2 className="form-header"> Job title & location: </h2>
                  <input
                    className="priorities-input"
                    id="priority-description-input"
                  ></input>
                  <ul id="must-haves-list">
                    <h2 className="list-header" id="must-haves-title">
                      MUST-HAVES
                    </h2>
                    {mustHaves.map((e) => (
                      <li className="priorities-list-items">
                        {" "}
                        {e.must_haves}{" "}
                        <Checkbox
                          size="md"
                          padding="5px"
                          border="#F5804E"
                          color="#0090C3"
                        ></Checkbox>
                      </li>
                    ))}
                  </ul>

                  <ul id="negotiables-list">
                    <h2 className="list-header" id="negotiables-title">
                      NEGOTIABLES
                    </h2>
                    {negotiables.map((e) => (
                      <li className="priorities-list-items">
                        {e.negotiables}{" "}
                        <Checkbox
                          padding="5px"
                          border="#F5804E"
                          color="#0090C3"
                        ></Checkbox>
                      </li>
                    ))}
                  </ul>

                  <ul id="dealbreakers-list">
                    <h2 className="list-header" id="dealbreakers-title">
                      DEAL-BREAKERS
                    </h2>
                    {dealBreakers.map((e) => (
                      <li className="priorities-list-items">
                        {e.deal_breakers}{" "}
                        <Checkbox
                          padding="5px"
                          border="#F5804E"
                          color="#0090C3"
                        ></Checkbox>
                      </li>
                    ))}
                  </ul>
                  <ul id="nice2have-list">
                    <h2 className="list-header" id="nice2have-title">
                      NICE TO HAVE
                    </h2>
                    {niceToHaves.map((e) => (
                      <li className="priorities-list-items">
                        {e.nice_to_have}{" "}
                        <Checkbox
                          padding="5px"
                          padding="5px"
                          border="#F5804E"
                          color="#0090C3"
                        ></Checkbox>
                      </li>
                    ))}
                  </ul>
                  <button className="priorities-button">Save to my list</button>
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkReqsList;
