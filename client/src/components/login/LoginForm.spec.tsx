import { expect } from "vitest";
import { LoginForm } from "./LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@/hooks/useLogin");

describe("LoginForm", () => {
  const mockHandleSubmit = vi.fn();
  const mockSetUsername = vi.fn();
  const mockSetPassword = vi.fn();

  beforeEach(() => {
    (useLogin as vi.Mock).mockReturnValue({
      handleSubmit: mockHandleSubmit,
      setUsername: mockSetUsername,
      setPassword: mockSetPassword,
    });
    mockHandleSubmit.mockClear();
  });

  it("renders without crashing", () => {
    render(<LoginForm />);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it("calls handleSubmit when the form is submitted", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "Test username" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Test password" },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(mockSetUsername).toHaveBeenCalledTimes(1);
    expect(mockSetPassword).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
