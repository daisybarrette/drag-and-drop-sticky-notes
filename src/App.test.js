import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the heading", () => {
    render(<App />);
    const heading = screen.getByText(/Todo List & Notes/i);
    expect(heading).toBeInTheDocument();
});

test("the initial count is zero", () => {
    render(<App />);
    const countText = document.getElementById("countText");
    expect(countText).toHaveTextContent("The button has been clicked 0 times");
});

test("renders the list of notes", () => {
    render(<App />);
    const list = document.getElementsByClassName("noteList");
    expect(list).toBeTruthy();
});

test("renders the sample note", () => {
    render(<App />);
    const noteList = document.getElementsByTagName("li");
    expect(noteList[0]).toHaveTextContent("Start my to-do list");
});
