import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App", () => {
  test("renders app", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const paragraphElement = screen.getByText(
      "Welcome to the official Pokè Partner app where we collect your data and do absolutely nothing with it!"
    );
    expect(paragraphElement).toBeInTheDocument();
  });

  test("submits form data successfully", async () => {
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

  test("submits pokemon name form successfully", async () => {
    window.history.pushState({}, "", "/partner");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByText("If you already know your Pokèmon match!")
    );
    fireEvent.change(screen.getByLabelText("Pokèmon Name:"), {
      target: { value: "Tapu-Fini" },
    });
    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Tapu fini");
  });

  test("submits pokemon color form successfully", async () => {
    window.history.pushState({}, "", "/partner");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByText(
        "Select a color and we'll present a list of Pokèmon matching that color that you can choose from!"
      )
    );
    fireEvent.change(screen.getByLabelText("Pokèmon Color:"), {
      target: { value: "Black" },
    });
    await screen.findByText("snorlax");
    fireEvent.click(screen.getByText("snorlax"));
    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Snorlax");
  });

  test("submits initial form successfully", async () => {
    window.history.pushState({}, "", "/partner");
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByText(
        "Enter a set of first and last intials and we'll find a Pokèmon using our magic algorithm!"
      )
    );
    fireEvent.change(screen.getByLabelText("Initials:"), {
      target: { value: "KM" },
    });
    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Sandaconda");
  });
});
