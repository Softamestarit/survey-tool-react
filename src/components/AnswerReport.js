import React, { useState, useEffect} from 'react';

export default function AnswerReport() {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    
    useEffect (() => fetchData(), []);

    const fetchData = () => {
        fetch("http://localhost:8080/surveys/2")
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
                <li key={questionId}>
                    <p>Kysymys: {question.content}</p>
                
                {question.answers.map((answer, answerId) => (
                    <li key={answerId}>
                    Vastaus: {answer.text}   
                </li>
                    ))}
                    
                </li>
                ))}
            </ul>

        </div>
    )
}