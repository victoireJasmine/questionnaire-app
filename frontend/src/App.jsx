import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionnairePage from "./pages/QuestionnairePage";
import AdminAuthPage from "./pages/AdminAuthPage";
import QuestionList from "./pages/QuestionList";
import CreateQuestion from "./pages/QuestionnaireDetail";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AdminAuthPage />} />
        <Route path="/questionnaire" element={<Home />} />
        <Route path="/questionnaire/:id/add" element={<CreateQuestion />} />
        <Route path="/questionnaire/:id" element={<QuestionList />} />
        <Route path="/questionnaire/create" element={<QuestionnairePage />} />
      </Routes>
    </Router>
  );
}

export default App;
