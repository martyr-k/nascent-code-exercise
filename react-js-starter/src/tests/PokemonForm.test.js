import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { PokemonForm } from "../components/index";

describe("PokemonForm", () => {
  test("renders PokemonForm", () => {
    render(
      <BrowserRouter>
        <PokemonForm pokemonData={{}} />
      </BrowserRouter>
    );

    const paragraphElement = screen.getByText("Next, find your Pokèmon match!");
    expect(paragraphElement).toBeInTheDocument();
  });

  test("validates method input", async () => {
    render(
      <BrowserRouter>
        <PokemonForm pokemonData={{}} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Please select a search method.");
  });

  test("validates pokemon name input", async () => {
    render(
      <BrowserRouter>
        <PokemonForm pokemonData={{}} />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByText("If you already know your Pokèmon match!")
    );
    fireEvent.change(screen.getByLabelText("Pokèmon Name:"), {
      target: { value: "Tall" },
    });
    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Please enter a valid Pokèmon name.");
  });

  test("validates initials input", async () => {
    render(
      <BrowserRouter>
        <PokemonForm pokemonData={{}} />
      </BrowserRouter>
    );

    fireEvent.click(
      screen.getByText(
        "Enter a set of first and last intials and we'll find a Pokèmon using our magic algorithm!"
      )
    );
    fireEvent.change(screen.getByLabelText("Initials:"), {
      target: { value: "22" },
    });
    fireEvent.click(screen.getByText("Review"));
    await screen.findByText("Please enter valid initials.");
  });
});
