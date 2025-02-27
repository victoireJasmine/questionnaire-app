import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionnaireDetail from "./pages/QuestionnaireDetail";
import QuestionnairePage from "./pages/QuestionnairePage";
import AdminAuthPage from "./pages/AdminAuthPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminAuthPage />} />
        <Route path="/questionnaire" element={<Home />} />
        <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
        <Route path="/questionnaire/create" element={<QuestionnairePage />} />
      </Routes>
    </Router>
  );
}

export default App;
