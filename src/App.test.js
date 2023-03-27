import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByText(/Todo List & Notes/i);
    expect(heading).toBeInTheDocument();
});

test("the initial count is zero", () => {
    render(<App />);
    const countText = document.getElementById('countText')
    expect(countText).toHaveTextContent('The button has been clicked 0 times')
});
