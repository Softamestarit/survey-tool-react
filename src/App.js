import './App.css';
import AnswerReport from './components/AnswerReport';
import QuestionList from './components/QuestionList';

function App() {
  return (
    <div className="App">
      <QuestionList />
      <AnswerReport/>
    </div>
  );
}

export default App;
