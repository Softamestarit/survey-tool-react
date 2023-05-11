import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AnswerReport() {
    const { id } = useParams();
    const [survey, setSurvey] = useState([]);
    
    useEffect (() => fetchData(), [id]);

    const fetchData = () => {
        fetch("https://survey-tool-spring-production.up.railway.app/surveys/" + id)
          .then((response) => response.json())
          .then((responseData) => {
            setSurvey(responseData)
          })
          .catch((err) => console.error(err));
    };

    return (
        <Box sx={{margin: 3}}>
        <Typography variant="h4">
            Survey Report
        </Typography>
        <Typography >
           Survey title: <strong>{survey.title}</strong>
        </Typography>
        <Link to={`https://survey-tool-spring-production.up.railway.app/admin/survey/${survey.surveyId}`}>
        <Typography gutterBottom>
            Go to manage survey
        </Typography>
        </Link>
        <Typography>
            Click a question to see it's question report.
        </Typography>
        {survey?.questions && survey.questions.map((question, index) => (
            <div key={question.questionId}>
                <Link to={`/survey/${survey.surveyId}/report/question/${question.questionId}`}>
                    <p><strong>Question: {index + 1}:</strong> {question.content}</p>
                </Link>
            </div>
        ))}
        </Box>
    );
}