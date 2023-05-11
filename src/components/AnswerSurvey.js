import React, {useEffect} from "react";
import { useState } from "react";

export default function AnswerSurvey(){

    /*
    1. hae fetch
    2. tee objectit
        questions
            question1: Mitä kuuluu,
            question2: ...
        answers
            answer1: '',
            answer2: ''
    3. kaks useState johon noi objectit
    4. set values idllä
    */

 //   useState [answerValues, setAnswerValues] = useState(answers);

 //   const questions = {};   
 //  const answers = {};

    const [questions, setQuestions] = useState ([]);
    const [answers, setAnswers] = useState ([]);
    
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch("http://localhost:8080/surveys/1")
          .then((response) => response.json())
          .then((responseData) => {
            setQuestions(responseData[0].questions);
            console.log(responseData);
            for(let i = 0; i < responseData[0].questions.length; i++) {
                questions["answer" + i] = responseData[0].questions[i]; 
            }
            console.log(questions);
            console.log(answers);
          })
          .catch((err) => console.error(err));
      };
}