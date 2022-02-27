import e from "cors";
import React, { useState, useEffect } from "react";
import "./HowTos.css";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
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
  //to store all of the posts
  const [howToPost, setHowToPost] = useState([]);
  //to set a new post title
  const [howToTitle, setHowToTitle] = useState("");
  //toggles based on user clicking to display rich text editor
  const [showTextEditor, setShowTextEditor] = useState(false);
  //holds search terms
  const [postSearchTerms, setPostSearchTerms] = useState("");
  // EDITOR PACKAGE - DRAFT JS//
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  //TOGGLES TEXT EDITOR WHEN USER CLICKS
  const handleAddPost = () => {
    setShowTextEditor(!showTextEditor);
  };

  //EDITING STATES
  //sets the title for the new post
  const handleNewTitle = (e) => {
    let newTitle = e.target.value;
    setHowToTitle(newTitle);
  };

  //handles the new post submission
  const handleNewPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic_title: howToTitle,
        step_by_step: convertedContent, //send the html content encoded with the he packageto the step by step area
        tag_id: 1,
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setHowToPost(json); //update the list
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
        console.log(res);
        console.log(howTo.id);
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

  //handles search term input
  const handlePostSearchTerms = (e) => {
    let searchTerms = e.target.value;
    setPostSearchTerms(searchTerms);
  };

  //handles displaying search results
  const handleSearchPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5001/lesson-list/${postSearchTerms}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json() /*res.json()*/) //First transform the JSON to a Javascript object
      .then((json) => {
        setPostSearchTerms("");
        setHowToPost(json); //update the list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //displays all posts again
  const showAllPosts = () => {
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
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //gets all posts stored in the back-end on load
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
        //(json);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="header">
        <h2 className="how-to-header-text">My Lessons</h2>
        <div className="title-quote">
          <h1 className="title-quote-animation">
            {" "}
            "To teach is to learn twice" - Joseph Joubert
          </h1>
        </div>
      </div>
      {showTextEditor === true ? (
        <div className="leftcolumn">
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
            <Button onClick={handleNewPost}>ADD POST</Button>
          </div>
        </div>
      ) : (
        <div class="leftcolumn">
          {howToPost.map((howTo) => (
            <div class="card">
              <h2 className="how-to-headings">{howTo.topic_title}</h2>
              <h5 className="how-to-date">
                <b>POSTED:</b> {howTo.date.toString().slice(0, 10)}{" "}
              </h5>
              {/*<p className="how-to-post"> {howTo.step_by_step}</p>*/}
              {<div className="post-content">{parse(howTo.step_by_step)}</div>}
              <span>
                {" "}
                <Button
                  className="delete-post-button"
                  onClick={() => handleDeletePost(howTo)}
                >
                  Delete this post{" "}
                </Button>{" "}
              </span>
            </div>
          ))}
        </div>
      )}
      <div class="rightcolumn">
        <div class="card">
          {showTextEditor ? (
            <h2 className="how-to-menu-title">
              {" "}
              Need some inspiration? Take a look:
            </h2>
          ) : (
            <h2 className="how-to-menu-title">
              Learn something new today? Go on:
            </h2>
          )}

          {showTextEditor ? (
            <Button onClick={handleAddPost}> See old posts </Button>
          ) : (
            <Button onClick={handleAddPost}> Add a post</Button>
          )}
          <div style={{ height: "150px" }}>
            <img
              alt="robot"
              src="https://cdni.iconscout.com/illustration/premium/thumb/easy-online-learning-1946855-1648374.png"
            ></img>
          </div>
        </div>
        <div class="card">
          <h2 className="how-to-menu-title">Find a past lesson:</h2>
          <input
            value={postSearchTerms}
            onChange={handlePostSearchTerms}
          ></input>
          <Button onClick={handleSearchPost}>Search</Button>
          <Button onClick={showAllPosts}>Show all posts again</Button>
        </div>
      </div>
    </div>
  );
}

export default HowTos;
