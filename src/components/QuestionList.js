import React, { useState, useEffect } from "react";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("blaablaa.com")
      .then((response) => response.json())
      .then((responseData) => setQuestions('data'))
      .catch((err) => console.error(err));
  };

  const columnDefs = [
    {},
    {},
    {},
    {}
    ];

  return (
    <div>
      <h1>Moro moro</h1>
    </div>
  );
}
