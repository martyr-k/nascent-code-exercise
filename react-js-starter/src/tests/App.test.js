import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

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

test("renders welcome form", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const paragraphElement = screen.getByText(
    "First, let's start by gathering some information about you."
  );
  expect(paragraphElement).toBeInTheDocument();
});

test("validates form data", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText("Choose a Pokèmon"));
  const paragraphElement = screen.getByText("A first name is required.");
  expect(paragraphElement).toBeInTheDocument();
});

// test("validates form data", () => {
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//   fireEvent.click(screen.getByText("Choose a Pokèmon"));
//   const paragraphElement = screen.getByText("A first name is required.");
//   expect(paragraphElement).toBeInTheDocument();
// });
