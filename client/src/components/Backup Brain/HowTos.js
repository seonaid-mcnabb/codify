import e from "cors";
import React, { useState, useEffect } from "react";
import "./HowTos.css";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";
//external package for text editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

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
  const [stepByStep, setStepByStep] = useState([]);

  //EXPERIMENTING WITH EDITOR PACKAGE HERE//
  let _contentState = ContentState.createFromText("Add a new post");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  const addPost = () => {
    setStepByStep(contentState);
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

      <div class="row">
        <div class="leftcolumn">
          <div className="add-a-post">
            <h2 className="how-to-headings">Add a title:</h2>
            <input name="title"></input>
            <Editor
              defaultContentState={contentState}
              onContentStateChange={setContentState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <Button onClick={addPost}>ADD POST</Button>
          </div>

          {howToPost.map((howTo) => (
            <div class="card">
              <h2 className="how-to-headings">{howTo.topic_title}</h2>
              <h5 className="how-to-date">
                <b>POSTED:</b> {howTo.date.toString().slice(0, 10)}{" "}
              </h5>
              <p className="how-to-post">{howTo.step_by_step}</p>
            </div>
          ))}
        </div>

        <div class="rightcolumn">
          <div class="card">
            <h2>Learn something new today?</h2>
            <Button>Add a post</Button>
            <div style={{ height: "150px" }}>
              <img
                alt="robot"
                src="https://www.ingeniovirtual.com/wp-content/uploads/machine-learning-en-marketing.jpg"
              ></img>
            </div>
          </div>
          <div class="card">
            <h3>Find a past lesson:</h3>
            <input></input>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowTos;
