import { render, screen } from "@testing-library/react";
import { ChatMessage } from "./ChatMessage";

describe("ChatMessage", () => {
  it("renders the correct message", () => {
    render(<ChatMessage message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });
});
