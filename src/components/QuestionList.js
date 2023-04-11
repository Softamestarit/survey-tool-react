import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function QuestionList() {
  const [survey, setSurvey] = useState([]);

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

 /* const columnDefs = [
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
        <thead>
          <tr>
            {survey.map((survey, index) => (
              <th key={index}>{survey.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {survey.map((survey, index) => (
              <td key={index}>
                {survey.questions.map((question, index) => (
                  <p key={index}>{question.content}</p>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
