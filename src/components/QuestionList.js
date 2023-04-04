import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function QuestionList() {
  const [survey , setSurvey] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/surveys")
      .then((response) => response.json())
      .then((responseData) => setSurvey(responseData._embedded.surveys))
      .catch((err) => console.error(err));

  };

  const columnDefs = [
    {field: "name"},
    ];

  return (
    <div className="ag-theme-material" style={{ height: 600, width: "100%", margin: "auto" }}>
      
      <AgGridReact
      columnDefs={columnDefs}
      rowData={survey}></AgGridReact>
    </div>
  );
}
