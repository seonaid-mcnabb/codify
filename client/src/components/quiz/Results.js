import React, { useEffect } from "react";

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

  for (let i = 0; i < props.questions.length; i++) {
    if (props.userAnswersArray[i] == props.questions[i].correct_answer) {
      points++;
    }
    if (i == 0) {
      answers.splice(0, 1, {
        question: props.questions[i].question,
        user_answer: props.userAnswersArray[i],
        formatted_user_answer: props.userAnswersArray[i].slice(-1),
        correct_answer: props.questions[i].correct_answer,
        formatted_correct_answer: props.questions[i].correct_answer.slice(-1),
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
        formatted_correct_answer: props.questions[i].correct_answer.slice(-1),
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
    console.log(answers[i].all_answers);
    console.log(answers[i].correct_answer);
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
      <h1>Results</h1>
      <p>{result}</p>
      <h6>Check your answers ⬇️</h6>
      {answers
        ? answers.map((answer, id) => (
            <div id={id} key={id}>
              <h5>{answer.question}</h5>
              <h6>
                {answer.user_answer === answer.correct_answer ? (
                  <p>
                    ✅ You got it right! The correct answer was{" "}
                    {answer.formatted_correct_answer})
                    <br />
                  </p>
                ) : (
                  <p>
                    ❌ You got it wrong. The correct answer was{" "}
                    {answer.formatted_correct_answer}). You answered{" "}
                    {answer.formatted_user_answer})
                    <br />
                  </p>
                )}
                {answer.all_answers[0] ? (
                  <h6>a) {answer.all_answers[0]}</h6>
                ) : (
                  ""
                )}
                {answer.all_answers[1] ? (
                  <h6>b) {answer.all_answers[1]}</h6>
                ) : (
                  ""
                )}
                {answer.all_answers[2] ? (
                  <h6>c) {answer.all_answers[2]}</h6>
                ) : (
                  ""
                )}
                {answer.all_answers[3] ? (
                  <h6>d) {answer.all_answers[3]}</h6>
                ) : (
                  ""
                )}
                {answer.all_answers[4] ? (
                  <h6>e) {answer.all_answers[4]}</h6>
                ) : (
                  ""
                )}
                {answer.all_answers[5] ? (
                  <h6>f) {answer.all_answers[5]}</h6>
                ) : (
                  ""
                )}
              </h6>
            </div>
          ))
        : ""}
    </div>
  );
};

export default Results;
