import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from '@mui/material/TextField'; 
import AddAnswer from "./AddAnswer";

export default function QuestionList() {
  const [survey, setSurvey] = useState([]);
//  const [answers, setAnswers] = useState({});
//  const [answer, setAnswer] = useState('');

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://localhost:8080/surveys")
      .then((response) => response.json())
      .then((responseData) => {
        setSurvey(responseData);
        console.log(responseData);
      })
      .catch((err) => console.error(err));
  };

  const saveAnswer = (answer) => {
    fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
  })
  .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

/*  const handleSubmit = (e) => {
    e.preventDefault();
    survey.forEach((s) =>{
      s.questions.forEach((q) =>{
      const answer = answers[q.questionId];
      if(answer !== undefined) {
        addAnswer(q.questionId, answer);

      }
    });
  });
    
 };    
  
    const addAnswer = (questionId, answer) =>{
      fetch("http://localhost:8080/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      questionId,
      answer,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
       setAnswers((answers) => [data, ...answers]);
       setAnswer('');
    })
    .catch((err) => {
       console.log(err.message);
    });
};


  const columnDefs = [
    { field: "name" },
    { field: "questions[0].content", headerName: "Question" },
  ]; */

  return (
    /**   <div className="ag-theme-material" style={{ height: 600, width: "100%", margin: "auto" }}>
      
      <AgGridReact
      columnDefs={columnDefs}
      rowData={survey}></AgGridReact>
    </div> */

    <div>
      <h1>Softamestarien superkysely</h1>
      <table>
          <tr>
          {survey.map((survey, index) => (
  <td key={index}>
    {survey.questions.map((question, index) => (
      <div key={index}>
        {question.content}
        <AddAnswer saveAnswer = {(answer) => saveAnswer({questionId: question.questionId, ...answer})}/>
    {/*     <TextField
          value={answers[question.questionId] || ''}
          onChange={(event) =>
            setAnswers({
              ...answers,
              [question.questionId]: event.target.value,
            })
          }
        /> */}
      </div>
    ))}
    
  </td>
))}
          </tr>
      </table>
    </div>
  );
}
