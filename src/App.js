import './App.css';
import SurveyResponseForm from './components/SurveyResponseForm';
import AnswerReport from './components/AnswerReport';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TextAnswerReport from './components/TextAnswerReport';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/survey/:id/response" element={<SurveyResponseForm />} />
          <Route path="/survey/:id/report" element={<AnswerReport />} />
          <Route path="/survey/:surveyId/report/question/:questionId/" element={<TextAnswerReport />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
