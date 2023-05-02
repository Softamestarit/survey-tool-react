import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { saveAnswers } from "../modules/answers";

export default function QuestionsAndAnswers() {

    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch("https://survey-tool-spring-production.up.railway.app/surveys/1")
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [name]: {
            ...prevAnswers[name],
            text: value
          }
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveAnswers(answers)
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
                    name = {(question.questionId - 1).toString() /* if works it works */}
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
    } else if (survey.startTime > today && survey.endTime > today){
      return (
        <p>Kyselyyn vastaaminen alkaa {survey.startTime}</p>
      );
    } else {
      return (
        <p>Kyselyyn vastaaminen on päättyny {survey.endTime}</p>
      );
    }

    
}