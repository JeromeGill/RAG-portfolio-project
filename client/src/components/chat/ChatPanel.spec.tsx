// ChatPanel.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import { ChatPanel } from "./ChatPanel";
import { ChatbotProvider } from "@/contexts/chatbot/ChatbotProvider";

vi.mock("@/contexts/chatbot", () => ({
  useChatbot: () => ({
    messages: ["Test message 1", "Test message 2"],
  }),
}));

describe("ChatPanel", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <ChatbotProvider>
        <ChatPanel />
      </ChatbotProvider>,
    );

    expect(getByText("Test message 1")).toBeInTheDocument();
    expect(getByText("Test message 2")).toBeInTheDocument();
  });
});
