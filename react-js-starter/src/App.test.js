import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    "First, let's start by gathering some information about you."
  );
  expect(linkElement).toBeInTheDocument();
});
