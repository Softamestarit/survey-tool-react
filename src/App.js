import React from 'react';
import './App.css';
import SurveyResponseForm from './components/SurveyResponseForm';
import ChartAnswerReport from './components/ChartAnswerReport';
import AnswerReport from './components/AnswerReport';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import logo from './components/logo.png';
import TextAnswerReport from './components/TextAnswerReport';

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar position="static" style={{ height: '100px' }}>
          <Toolbar>
          <div style={{ padding: '16px' }}>
            <img src={logo} alt="Logo" width="220" height="70" />
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/survey/:id/response" element={<SurveyResponseForm />} />
          <Route path="/survey/:id/chart-report" element={<ChartAnswerReport />} />
          <Route path="/survey/:id/report" element={<AnswerReport />} />
          <Route path="/survey/:surveyId/report/question/:questionId/" element={<TextAnswerReport />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;