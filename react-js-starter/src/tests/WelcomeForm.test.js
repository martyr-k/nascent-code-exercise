import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { WelcomeForm } from "../components/index";

describe("WelcomeForm", () => {
  test("renders WelcomeForm", () => {
    render(
      <BrowserRouter>
        <WelcomeForm welcomeData={{}} />
      </BrowserRouter>
    );

    const paragraphElement = screen.getByText(
      "First, let's start by gathering some information about you."
    );
    expect(paragraphElement).toBeInTheDocument();
  });

  test("validates required input", () => {
    render(
      <BrowserRouter>
        <WelcomeForm welcomeData={{}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Choose a Pokèmon"));
    const paragraphElement = screen.getByText("A first name is required.");
    expect(paragraphElement).toBeInTheDocument();
  });

  test("validates phone number input", () => {
    render(
      <BrowserRouter>
        <WelcomeForm welcomeData={{}} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Phone Number:"), {
      target: { value: "613262948" },
    });
    fireEvent.click(screen.getByText("Choose a Pokèmon"));
    const paragraphElement = screen.getByText(
      "A valid phone number is required."
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
