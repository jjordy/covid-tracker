import React from "react";
import preloadAll from "jest-next-dynamic";
import { render, screen, act } from "@testing-library/react";
import IndexPage from "pages";

// this will make sure next/dynamic works properly with our test.
beforeAll(async () => {
  await preloadAll();
});

test("The app renders", () => {
  expect.assertions(1);
  act(() => {
    render(<IndexPage />);
    expect(screen.queryByText("My Nextjs Boilerplate.")).toBeDefined();
  });
});
