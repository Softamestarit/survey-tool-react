import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from "@mui/material/TextField";
import AddAnswer from "./AddAnswer";
import { useTable } from "react-table";

export default function QuestionTable() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((responseData) => {
        setQuestions(responseData);
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
      body: JSON.stringify(answers),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      Header: "Question",
      accessor: "content",
    },
    {
      Header: "Answer",
      sortable: false,
      filterable: false,
      Cell: (row) => (
        <AddAnswer saveAnswer={saveAnswer} answer={row.original} />
      ),
    },
  ];

  const questionTable = useTable({columns, questions});

  return (
    <div>
      <h1>Softamestarien superkysely</h1>
      <table {...questionTable.getTableProps}>
        <tbody {...questionTable.getTableBodyProps}>

        </tbody>
      </table>
    </div>
  );
}
