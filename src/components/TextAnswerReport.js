import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function TextAnswerReport() {
  const { surveyId, questionId } = useParams();
  const [survey, setSurvey] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, [surveyId]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://survey-tool-spring-production.up.railway.app/surveys/" +
          surveyId
      );
      const responseData = await response.json();
      setSurvey(responseData);
      setQuestions(responseData.questions);
    } catch (error) {
      console.error(error);
    }
  };

  // find the selected question
  const selectedQuestion = questions.find(
    (question) => question.questionId === Number(questionId)
  );

  console.log(selectedQuestion);

  if (
    selectedQuestion &&
    selectedQuestion.options &&
    selectedQuestion.options.length !== 0
  ) {
    // create the data for the pie chart
    const data = selectedQuestion
      ? selectedQuestion.options.map((option) => {
          const totalAnswers = selectedQuestion.options.reduce(
            (total, opt) => total + opt.answers.length,
            0
          );
          const percentage = (
            (option.answers.length / totalAnswers) *
            100
          ).toFixed(1);

          return {
            questionId,
            name: option.content,
            value: option.answers.length,
            percentage,
          };
        })
      : [];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
      <div>
        <Box sx={{ margin: 3 }}>
          <Typography variant="h4">Question Report</Typography>
          <Typography>
            Survey: <strong>{survey.title}</strong>
          </Typography>
          <Typography gutterBottom>
            Question: <strong>{selectedQuestion.content}</strong>
          </Typography>
          <Link to={`/survey/${survey.surveyId}/report/`}>
            <Typography>Go back to survey report</Typography>
          </Link>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              formatter={(value, entry) =>
                `${value} (${entry.payload.percentage}%)`
              }
            />
          </PieChart>
        </Box>
      </div>
    );
  } else if (
    selectedQuestion &&
    selectedQuestion.options &&
    selectedQuestion.options.length === 0
  ) {
    // get question by id
    const question = survey?.questions?.find(
      (q) => q.questionId === Number(questionId)
    );

    return (
      <Box sx={{ margin: 3 }}>
        <Typography variant="h4">Question Report</Typography>
        <Typography>
          Survey: <strong>{survey.title}</strong>
        </Typography>
        <Typography gutterBottom>
          Question: <strong>{question ? question.content : "Loading"}</strong>
        </Typography>
        <Link to={`/survey/${survey.surveyId}/report/`}>
          <Typography>Go back to survey report</Typography>
        </Link>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          Answers:
        </Typography>
        <ol>
          {question && question.answers && question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <li key={answer.answerId}>{answer.text}</li>
            ))
          ) : (
            <p>No answers for this question yet</p>
          )}
        </ol>
      </Box>
    );
  } else {
    return (
      <Box sx={{ margin: 3 }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  };
};
