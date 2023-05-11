import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TextAnswerReport() {
  const { surveyId, questionId } = useParams();
  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    fetchData();
  }, [surveyId]);

  
  const fetchData = async () => {
    try {
      const response = await fetch("https://survey-tool-spring-production.up.railway.app/surveys/" + surveyId);
      const responseData = await response.json();
      setSurvey(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  
  // get question by id
  const question = survey?.questions?.find((q) => q.questionId === Number(questionId));

  return (
    <Box sx={{margin: 3}}>
      <Typography variant="h4">
        Question Report
      </Typography>
      <Typography>
        Survey: <strong>{survey.title}</strong>
      </Typography>
      <Typography gutterBottom>
         Question: <strong>{question ? question.content : "Loading"}</strong>
      </Typography>
      <Link to={`/survey/${survey.surveyId}/report/`}>
      <Typography>
        Go back to survey report
      </Typography>   
      </Link>
      <Typography variant="h6" sx={{fontWeight: '600'}}>
        Answers:
      </Typography>
      <ol>
      {question && question.answers && question.answers.length > 0 ? (
        question.answers.map(answer => (
            <li key={answer.answerId}>{answer.text}</li>
        ))
      
      ) : (
       <p>No answers for this question yet</p>
      )}
      </ol>
      </Box>
  );
}
