import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import _ from "lodash";

export default function ChartAnswerReport() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => fetchData(), [id]);

  const fetchData = () => {
    fetch("https://survey-tool-spring-production.up.railway.app/surveys/" + id)
      .then((response) => response.json())
      .then((responseData) => {
        setQuestions(responseData.questions);
        setTitle(responseData.title);
      })
      .catch((err) => console.error(err));
  };

  const data = _.flatMap(questions, (question, questionId) => {
    const totalAnswers = question.options.reduce(
      (acc, option) => acc + option.answers.length,
      0
    );
    return question.options.map((option) => {
      return {
        questionId,
        name: option.content,
        value: option.answers.length,
        percentage: ((option.answers.length / totalAnswers) * 100).toFixed(1),
      };
    });
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  console.log(data);

  return (
    <div>
      <h1>Kyselyn vastaukset</h1>
      <h2>{title}</h2>

      <ul>
        {questions.map((question, questionId) => (
          <div key={questionId}>
            <p>
              <strong>Kysymys {questionId + 1}:</strong> {question.content}
            </p>

            {question.answers.map((answer, answerId) => (
              <p key={answerId}>
                Vastaus {answerId + 1} : {answer.text}
              </p>
            ))}
            <PieChart width={400} height={400}>
              <Pie
                data={data.filter((entry) => entry.questionId === questionId)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data
                  .filter((entry) => entry.questionId === questionId)
                  .map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Tooltip />
              <Legend
                formatter={(value, entry) => {
                  const { percentage } = entry.payload;
                  return `${value} (${percentage}%)`;
                }}
              />
            </PieChart>
          </div>
        ))}
      </ul>
    </div>
  );
}