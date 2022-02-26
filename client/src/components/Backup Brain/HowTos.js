import e from "cors";
import React, { useState, useEffect } from "react";
import "./HowTos.css";
import Header from "../Header.js";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineDelete } from "react-icons/md";

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
  const [stepByStep, setStepByStep] = useState("");

  return (
    <div>
      <Header></Header>
      <p>this is a how to component</p>
    </div>
  );
}

export default HowTos;
