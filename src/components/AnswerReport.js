import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router';

export default function AnswerReport() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    
    useEffect (() => fetchData(), [id]);

    const fetchData = () => {
        fetch("https://survey-tool-spring-production.up.railway.app/surveys/" + id)
          .then((response) => response.json())
          .then((responseData) => {
            setQuestions(responseData.questions)
            setTitle(responseData.title);
          })
          .catch((err) => console.error(err));
    };

    console.log(questions)

    return (
        <div>
            <h1>Kyselyn vastaukset</h1>
            <h2>{title}</h2>

            <ul>
                {questions.map((question, questionId) => (
                <div key={questionId}>
                    <p><strong>Kysymys {questionId + 1}:</strong> {question.content}</p>
                
                {question.answers.map((answer, answerId) => (
                    <p key={answerId}>
                    Vastaus {answerId + 1} : {answer.text}   
                </p>
                    ))}
                    
                </div>
                ))}
            </ul>

        </div>
    )
}