import e from "cors";
import React, { useState, useEffect } from "react";
import "./HowTos.css";
import Header from "../Header.js";
import Fade from "react-reveal/Fade";

//external package for text editor
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";

const he = require("he");

//This component:
//focuses on "teaching to learn"

//User can:
//Input a How to Topic title
//input the step-by-step explanation
//save the how to to their personal collection
//search through how-tos later

function HowTos() {
  //set loading state
  const [loading, setLoading] = useState(true);
  //set and store full posts
  const [howToPost, setHowToPost] = useState([]);
  //store new post title input
  const [howToTitle, setHowToTitle] = useState("");
  //stores the post entry as converted html content
  const [convertedContent, setConvertedContent] = useState();
  //set the user input search terms
  const [postSearchTerms, setPostSearchTerms] = useState("");

  //set whether search results are being displayed (needed for conditional rendering of buttons)
  const [displaySearchResults, setDisplaySearchResults] = useState(false);

  // STATES RELATED TO THE EDITOR PACKAGE - DRAFT JS//
  //creates an empty editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  //converts the content into readable html
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  //can't remember if I actually use this
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  //sets display of rich text editor (default false so post view is shown initially)
  const [showTextEditor, setShowTextEditor] = useState(false);
  //toggles view of
  const handleAddPost = () => {
    setShowTextEditor(!showTextEditor);
  };

  /*FUNCTIONS FOR MANIPULATING STATES*/
  //sets the title for the new post
  const handleNewTitle = (e) => {
    let newTitle = e.target.value;
    setHowToTitle(newTitle);
  };

  //posts a new lesson to the MySQL database onSubmit
  const handleNewPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_title: howToTitle,
        step_by_step: convertedContent, //send the html content encoded with the packageto as step by step post content
        tag_id: 1, //default because haven't implemented linked tables on this yet
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setHowToPost(json); //update the post list
        setShowTextEditor(!showTextEditor); //close the text editor and show updated post list
        setEditorState(EditorState.createEmpty()); //Set editor back to empty
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handles post deletion
  const handleDeletePost = (howTo) => {
    console.log(howTo.id);
    fetch(`http://localhost:5001/lesson/${howTo.id}`, {
      method: "delete",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setHowToPost(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //records and sets the user's search terms
  const handlePostSearchTerms = (e) => {
    let searchTerms = e.target.value;
    setPostSearchTerms(searchTerms);
  };

  //displays the search results
  const handleSearchPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/lesson-list/${postSearchTerms}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setPostSearchTerms(""); //reset search input
        setHowToPost(json); //update the list when search results are returned
        setDisplaySearchResults(!displaySearchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //displays all posts again (method created for the "see old posts button")
  const showAllPosts = () => {
    fetch("http://localhost:5001/lesson-list")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setHowToPost(json);
        setDisplaySearchResults(!displaySearchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //gets all the posts the user has stored in the back-end on page load
  useEffect(() => {
    fetch("http://localhost:5001/lesson-list")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error("Not 2xx response");
        }
      })
      .then((json) => {
        setHowToPost(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Fade bottom>
        {/*PAGE HEADER AREA*/}
        <div className="header">
          {/*<h2 className="how-to-header-text">My Lessons</h2>*/}
          <div className="title-quote">
            <h1 className="title-quote-animation">
              {" "}
              "To teach is to learn twice" - Joseph Joubert
            </h1>
          </div>
        </div>

        {/* Conditional Rendering of Post View or Add Post Text Editor View */}
        <div className="row body">
          {showTextEditor === true ? (
            <div className="col-lg-8">
              <div className="add-a-post">
                <span>
                  <input
                    type="text"
                    className="title-input"
                    name="title-input"
                    placeholder="Add a title"
                    onChange={handleNewTitle}
                  ></input>
                </span>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName="wrapper-class"
                  toolbarClassName="toolbar-class"
                  editorClassName="editor-class"
                  toolbar={{
                    options: ["inline", "blockType", "list"],
                    inline: { inDropdown: false, options: ["bold", "italic"] },
                    list: { options: ["unordered"] },
                    blockType: {
                      inDropdown: true,
                      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                  }}
                />
                <button className="how-to-button" onClick={handleNewPost}>
                  ADD POST
                </button>
              </div>
            </div>
          ) : (
            <div class="col-lg-8">
              {howToPost.map((howTo) => (
                <div className="post-card">
                  <h2 className="how-to-headings">{howTo.topic_title}</h2>
                  <h5 className="how-to-date">
                    <b>POSTED:</b> {howTo.date.toString().slice(0, 10)}{" "}
                  </h5>
                  {
                    <div className="post-content">
                      {parse(howTo.step_by_step)}
                    </div>
                  }
                  <span>
                    {" "}
                    <button
                      className="how-to-button"
                      onClick={() => handleDeletePost(howTo)}
                    >
                      Delete this post{" "}
                    </button>{" "}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/*SIDE BAR AREA
      -Contains conditionally rendered button based on whether text editor is visible or not, and search area  */}
          <div class="col-lg-4">
            <div class="card">
              <h2 className="how-to-menu-title"> My How-Tos</h2>

              {showTextEditor ? (
                <button className="how-to-button" onClick={handleAddPost}>
                  {" "}
                  See old posts{" "}
                </button>
              ) : (
                <button className="how-to-button" onClick={handleAddPost}>
                  {" "}
                  Add a post
                </button>
              )}
              <div style={{ height: "200px" }}>
                <img
                  alt="woman-at-desk"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/easy-online-learning-1946855-1648374.png"
                ></img>
              </div>
            </div>
            <div class="card">
              {/*Conditionally renders button based on whether search results are currently being displayed */}
              {displaySearchResults ? (
                <div className="search-area">
                  <h2 className="how-to-menu-title">
                    Not what you were looking for?{" "}
                    <button className="how-to-button" onClick={showAllPosts}>
                      Go back
                    </button>
                  </h2>
                </div>
              ) : (
                <div>
                  <h2 className="how-to-menu-title">Search for an answer:</h2>
                  <input
                    className="q-a-search-input"
                    value={postSearchTerms}
                    onChange={handlePostSearchTerms}
                  ></input>
                  <button className="how-to-button" onClick={handleSearchPost}>
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default HowTos;
