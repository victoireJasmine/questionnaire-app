import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuestionnaireList from "../QuestionnaireList";

describe("QuestionnaireList Component", () => {
  test("renders the questionnaire list with correct data", () => {
    const mockQuestionnaires = [
      { _id: "1", title: "Satisfaction Survey", description: "A survey to measure satisfaction." },
      { _id: "2", title: "Employee Feedback", description: "Collecting feedback from employees." },
    ];

    render(
      <MemoryRouter>
        <QuestionnaireList questionnaires={mockQuestionnaires} />
      </MemoryRouter>
    );

    expect(screen.getByText("Satisfaction Survey")).toBeInTheDocument();
    expect(screen.getByText("Employee Feedback")).toBeInTheDocument();
    expect(screen.getAllByText("Voir plus")).toHaveLength(2);
  });

  test("renders message when no questionnaires are available", () => {
    render(
      <MemoryRouter>
        <QuestionnaireList questionnaires={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Aucun questionnaire disponible.")).toBeInTheDocument();
  });
});
