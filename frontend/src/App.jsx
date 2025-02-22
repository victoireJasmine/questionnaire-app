import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionnaireDetail from "./pages/QuestionnaireDetail";
import QuestionnairePage from "./pages/QuestionnairePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
        <Route path="/create" element={<QuestionnairePage />} />
      </Routes>
    </Router>
  );
}

export default App;
