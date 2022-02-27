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
const he = require("he");
//This component:
//focuses on "teaching to learn"

//User can:
//Input a How to Topic title
//input the step-by-step explanation
//save the how to to their personal collection
//search through how-tos later

function HowTos() {
  const [howToPost, setHowToPost] = useState([]);

  const [howToTitle, setHowToTitle] = useState("");
  const [showTextEditor, setShowTextEditor] = useState(false);

  //EXPERIMENTING WITH EDITOR PACKAGE HERE//
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

  const handleAddPost = () => {
    setShowTextEditor(!showTextEditor);
  };

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
        step_by_step: convertedContent,
        tag_id: 1,
      }),
    })
      .then((res) => res.json()) //First transform the JSON to a Javascript object
      .then((json) => {
        setHowToPost(json); //update the list
        setShowTextEditor(!showTextEditor);
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
            <h2 className="how-to-headings">Add a title:</h2>
            <input name="title" onChange={handleNewTitle}></input>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
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
              {howTo.step_by_step}
              <Button onClick={() => handleDeletePost(howTo)}>
                Delete this post{" "}
              </Button>
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
              src="https://www.ingeniovirtual.com/wp-content/uploads/machine-learning-en-marketing.jpg"
            ></img>
          </div>
        </div>
        <div class="card">
          <h2 className="how-to-menu-title">Find a past lesson:</h2>
          <input></input>
          <Button>Search</Button>
        </div>
      </div>
    </div>
  );
}

export default HowTos;
