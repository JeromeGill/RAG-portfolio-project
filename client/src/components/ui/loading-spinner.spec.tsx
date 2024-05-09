import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./loading-spinner";

describe("LoadingSpinner", () => {
  test("has the hidden class when hidden prop is true", () => {
    render(<LoadingSpinner hidden={true} />);
    expect(screen.getByTestId("loadingSpinner")).toHaveClass("hidden");
  });

  test("does not have the hidden class when hidden prop is false", () => {
    render(<LoadingSpinner hidden={false} />);
    expect(screen.getByTestId("loadingSpinner")).not.toHaveClass("hidden");
  });
});
