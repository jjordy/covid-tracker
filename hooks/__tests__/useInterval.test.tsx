import { renderHook, act } from "@testing-library/react-hooks";
import useInterval from "hooks/useInterval";

test("Should call the function on the interval passed", async () => {
  jest.useFakeTimers();
  expect.assertions(2);
  const mockCallback = jest.fn();
  renderHook(() => useInterval(mockCallback, 250));
  expect(mockCallback).not.toBeCalled();
  jest.advanceTimersByTime(250);
  expect(mockCallback).toBeCalled();
});
