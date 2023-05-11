import './App.css';
import SurveyResponseForm from './components/SurveyResponseForm';
import AnswerReport from './components/ChartAnswerReport';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/survey/:id/response" element={<SurveyResponseForm />} />
          <Route path="/survey/:id/report" element={<AnswerReport />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
