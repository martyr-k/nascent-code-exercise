import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import { WelcomeForm } from "../components/index";
import App from "../App";

describe("WelcomeForm", () => {
  test("renders welcome form", () => {
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

  test("validates required form data", () => {
    render(
      <BrowserRouter>
        <WelcomeForm welcomeData={{}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Choose a Pokèmon"));
    const paragraphElement = screen.getByText("A first name is required.");
    expect(paragraphElement).toBeInTheDocument();
  });

  test("validates phone number", () => {
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

  test("submits form data", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "Kelub" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Martyr" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number:"), {
      target: { value: "6132629487" },
    });
    fireEvent.change(screen.getByLabelText("Street Address:"), {
      target: { value: "613 Wychwood Street" },
    });
    fireEvent.change(screen.getByLabelText("City:"), {
      target: { value: "Oshawa" },
    });
    fireEvent.change(screen.getByLabelText("Postal Code:"), {
      target: { value: "L1G2T4" },
    });

    fireEvent.click(screen.getByText("Choose a Pokèmon"));
    await screen.findByText("Next, find your Pokèmon match!");
  });
});
