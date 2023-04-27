import React, { useState, useEffect} from 'react';

export default function AnswerReport() {
    const [questions, setQuestions] = useState([]);
    
    useEffect (() => fetchData(), []);

    const fetchData = () => {
        fetch("http://localhost:8080/surveys/1")
          .then((response) => response.json())
          .then((responseData) => {
            setQuestions(responseData.questions);
          })
          .catch((err) => console.error(err));
    };

    console.log(questions)

    return (
        <div>
            <h1>Kyselyn vastaukset {}</h1>

            <ul>
                {questions.map((question, questionId) => (
                <li key={questionId}>
                    <p>{question.content}</p>
                
                {question.answers.map((answer, answerId) => (
                    <p key={answerId}>
                    {answer.text}   
                </p>
                    ))}
                    
                </li>
                ))}
            </ul>

        </div>
    )
}