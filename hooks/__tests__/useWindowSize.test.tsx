import { renderHook, act } from "@testing-library/react-hooks";
import useWindowSize from "hooks/useWindowSize";

test("Should call the function on the interval passed", async () => {
  expect.assertions(4);
  const { result } = renderHook(() => useWindowSize());
  // default sizes set by jest / jsdom
  expect(result.current.width).toBe(1024);
  expect(result.current.height).toBe(768);
  act(() => {
    //@ts-ignore
    global.innerWidth = 1280;
    //@ts-ignore
    global.innerHeight = 1024;
    //@ts-ignore
    global.dispatchEvent(new Event("resize"));
  });
  expect(result.current.width).toBe(1280);
  expect(result.current.height).toBe(1024);
});
