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
                <p key={questionId}>
                    <p><strong>Kysymys {questionId + 1}:</strong> {question.content}</p>
                
                {question.answers.map((answer, answerId) => (
                    <p key={answerId}>
                    Vastaus {answerId + 1} : {answer.text}   
                </p>
                    ))}
                    
                </p>
                ))}
            </ul>

        </div>
    )
}