import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByText(/Todo List & Notes/i);
    expect(heading).toBeInTheDocument();
});
