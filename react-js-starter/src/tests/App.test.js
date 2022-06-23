import { render, screen } from "@testing-library/react";
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
});
