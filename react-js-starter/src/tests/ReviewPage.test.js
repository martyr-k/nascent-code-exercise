import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { ReviewPage } from "../components/index";

describe("ReviewPage", () => {
  test("renders ReviewPage", async () => {
    render(
      <BrowserRouter>
        <ReviewPage
          pokemonData={{ pokemonName: "tapu-fini" }}
          welcomeData={{ firstName: "Kelub" }}
        />
      </BrowserRouter>
    );

    await screen.findByAltText("tapu-fini");
  });
});
