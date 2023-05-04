import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { saveAnswers } from "../modules/answers";
import { useParams } from "react-router";

export default function SurveyResponseForm() {

    const { id } = useParams();
    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);

    
    const fetchData = () => {
        fetch("https://survey-tool-spring-production.up.railway.app/surveys/" + id)
     //  fetch("http://localhost:8080/surveys/1")
          .then((response) => response.json())
          .then((responseData) => {
            setSurvey(responseData);
            const answersData = responseData.questions.map((question) => {
              return {
                question: {
                  questionId: question.questionId
                },
                text: ''
              };
            });
            setAnswers(answersData);
          })
          .catch((err) => console.error(err));
      };
      
      useEffect(() => {
        fetchData();
      }, [id]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const questionId = parseInt(name);
        setAnswers(prevAnswers => {
          const newAnswers = [...prevAnswers];
          const index = newAnswers.findIndex(ans => ans.question.questionId === questionId);
          newAnswers[index] = {
            question: {
              questionId
            },
            text: value
          };
          return newAnswers;
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Object.values(answers))
// if some answers empty, confirm from user
  if (answers.some((answer) => answer.text === '')) {
    const confirmSubmit = window.confirm('Some questions are unanswered. Do you still want to continue?');
    if (confirmSubmit) {
    saveAnswers(answers)
    setSurvey([]);
      
    }
  } else {
    saveAnswers(answers);
    setSurvey([]);

  } 
    }

    const today = new Date().toISOString().substring(0, 19);

    if (survey.startTime < today && survey.endTime > today) {
      return (
        <Box>
          { // if survey is undefined don't do anything
          survey?.questions && survey.questions.map((question) => (
                <Box key={question.questionId}>
                    <Typography variant="h6">{question.content}</Typography>
                    <TextField
                    name = {(question.questionId).toString() /* if works it works */}
                    multiline
                    variant="outlined"
                    style={{ width: "70%" }}
                    onChange={(e) => handleInputChange(e)}
                    />
                </Box>  
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit answers
          </Button>
        </Box>
    );
    }  else if (survey.startTime > today && survey.endTime > today){
      return (
        <p>Kyselyyn vastaaminen alkaa {survey.startTime}</p>
      );
    } else {
      return (
        <p>Kyselyyn vastaaminen on päättyny {survey.endTime}</p>
      );
    }

    
}