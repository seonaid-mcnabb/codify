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
import { NEWDATE } from "mysql/lib/protocol/constants/types";

//This component:
//focuses on "teaching to learn"

//User can:
//Input a How to Topic title
//input the step-by-step explanation
//save the how to to their personal collection
//search through how-tos later

function HowTos() {
  const [howToPost, setHowToPost] = useState([
    {
      date: new Date(),
      topic_title: "How To Loop Through an Array",
      step_by_step: "1. Do this. 2. Then do that. 3. Then do another thing.",
      tag_id: 1,
    },
    {
      date: new Date(),
      topic_title: "How To Merge On Github",
      step_by_step:
        "1. First do this. 2. Then do that. 3. Then do another thing.",
      tag_id: 1,
    },
  ]);

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

  return (
    <div>
      <Header></Header>
      <div className="header">
        <h2 className="how-to-header-text">My Lessons</h2>
        {/*
        <div class="w3-panel w3-leftbar w3-light-grey">
          <p class="w3-xlarge w3-serif">
            <i>"To teach is to learn twice."</i>
          </p>
          <p>Joseph Joubert</p>
        </div>
        */}
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
