import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

const Results = (props) => {
  let points = 0;
  let result = "";
  let message = "";
  let emoji = "";
  let score = 0;
  let answers = [
    {
      question: "",
      user_answer: "",
      formatted_user_answer: "",
      correct_answer: "",
      formatted_correct_answer: "",
      all_answers: [],
    },
  ];

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  for (let i = 0; i < props.questions.length; i++) {
    let value = props.questions[i].correct_answers;
    let correctAnswer = getKeyByValue(value, "true").slice(0, 8);
    console.log(correctAnswer);
    if (props.userAnswersArray[i] == correctAnswer) {
      points++;
    }
    if (i == 0) {
      answers.splice(0, 1, {
        question: props.questions[i].question,
        user_answer: props.userAnswersArray[i],
        formatted_user_answer: props.userAnswersArray[i].slice(-1),
        correct_answer: correctAnswer,
        formatted_correct_answer: correctAnswer.slice(-1),
        all_answers: [
          props.questions[i].answers.answer_a,
          props.questions[i].answers.answer_b,
          props.questions[i].answers.answer_c,
          props.questions[i].answers.answer_d,
          props.questions[i].answers.answer_e,
          props.questions[i].answers.answer_f,
        ],
      });
    } else {
      answers.push({
        question: props.questions[i].question,
        user_answer: props.userAnswersArray[i],
        formatted_user_answer: props.userAnswersArray[i].slice(-1),
        correct_answer: correctAnswer,
        formatted_correct_answer: correctAnswer.slice(-1),
        all_answers: [
          props.questions[i].answers.answer_a,
          props.questions[i].answers.answer_b,
          props.questions[i].answers.answer_c,
          props.questions[i].answers.answer_d,
          props.questions[i].answers.answer_e,
          props.questions[i].answers.answer_f,
        ],
      });
    }
  }

  score = (points / props.length) * 100;

  if (score <= 20) {
    message = "Oh dear, best keep practising.";
    emoji = "😬";
  } else if (score <= 40) {
    message = "Not your best, try again?";
    emoji = "🤷";
  } else if (score <= 60) {
    message = "Not bad, keep it up!";
    emoji = "✅";
  } else if (score <= 80) {
    message = "Awesome job!";
    emoji = "😎";
  } else if (score <= 100) {
    message = "Wow, you're unstoppable!";
    emoji = "🤩";
  }
  result = `You got ${points} out of ${props.length} right ${emoji}. ${message}`;

  return (
    <div>
      {/* <Header /> */}
      <h1>Results</h1>
      <center>
        <Box
          alignItems="flex"
          className="Topic"
          bg="#BFE8F3"
          borderRadius="1rem"
          padding="2rem"
          maxWidth="600px"
        >
          <p className="center">{result}</p>
          <p className="center">Check your answers ⬇️</p>
          {answers
            ? answers.map((answer, id) => (
                <center>
                  <div id={id} key={id} className="page">
                    <Accordion allowToggle maxWidth="600px" display="block">
                      <AccordionItem>
                        {answer.user_answer === answer.correct_answer ? (
                          <AccordionButton
                            _expanded={{ bg: "tomato", color: "white" }}
                          >
                            <Box flex="1" textAlign="left">
                              ✅ {answer.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        ) : (
                          <AccordionButton
                            _expanded={{ bg: "tomato", color: "white" }}
                          >
                            <Box flex="1" textAlign="left">
                              ❌ {answer.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        )}
                        <AccordionPanel>
                          <p>
                            The correct answer was{" "}
                            {answer.formatted_correct_answer}) and you answered{" "}
                            {answer.formatted_user_answer}).
                          </p>
                          {answer.all_answers[0] ? (
                            <p className="left">a) {answer.all_answers[0]}</p>
                          ) : (
                            ""
                          )}
                          {answer.all_answers[1] ? (
                            <p className="left">b) {answer.all_answers[1]}</p>
                          ) : (
                            ""
                          )}
                          {answer.all_answers[2] ? (
                            <p className="left">c) {answer.all_answers[2]}</p>
                          ) : (
                            ""
                          )}
                          {answer.all_answers[3] ? (
                            <p className="left">d) {answer.all_answers[3]}</p>
                          ) : (
                            ""
                          )}
                          {answer.all_answers[4] ? (
                            <p className="left">e) {answer.all_answers[4]}</p>
                          ) : (
                            ""
                          )}
                          {answer.all_answers[5] ? (
                            <p className="left">f) {answer.all_answers[5]}</p>
                          ) : (
                            ""
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </center>
              ))
            : ""}
        </Box>
      </center>
      <Footer />
    </div>
  );
};

export default Results;
