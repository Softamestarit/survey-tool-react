import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function QuestionsAndAnswers() {

    const [survey, setSurvey] = useState([]);
    const [answers, setAnswers] = useState([]);

    const answersData = {};

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch("https://survey-tool-spring-production.up.railway.app/surveys/1")
        .then((response) => response.json())
        .then((responseData) => {
            setSurvey(responseData);

            for(let i = 0; i < responseData.questions.length; i++) {
                const answer = {
                    questionId: responseData.questions[i].questionId,
                    answerText: ''
                }

                answersData[answer.questionId] = answer;
            }

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
            answerText: value
          }
        }));
      };

    console.log(answers)

    return (
        <Box>
          { // if survey is undefined don't do anything
          survey?.questions && survey.questions.map((question) => (
                <Box key={question.questionId}>
                    <Typography variant="h6">{question.content}</Typography>
                    <TextField
                    name = {question.questionId.toString()}
                    multiline
                    variant="outlined"
                    style={{ width: "70%" }}
                    onChange={(e) => handleInputChange(e)}
                    />
                </Box>
          ))}
        </Box>
    );
}