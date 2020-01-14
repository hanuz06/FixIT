import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "../../hooks/useVisualMode";

const LANDING = "LANDING";
const REQUEST = "REQUEST";
const CONFIRM = "CONFIRM";
const RATING = "RATING";  

test("useVisualMode should initialize with default value the mechanics landing page", () => {
  const { result } = renderHook(() => useVisualMode(LANDING));

  expect(result.current.mode).toBe(LANDING);
});
test("useVisualMode should transition from LANDING to REQUEST", () => {
  const { result } = renderHook(() => useVisualMode(LANDING));

  act(() => result.current.transition(REQUEST));
  expect(result.current.mode).toBe(REQUEST);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(LANDING));

  act(() => result.current.transition(REQUEST));
  expect(result.current.mode).toBe(REQUEST);

  act(() => result.current.transition(CONFIRM));
  expect(result.current.mode).toBe(CONFIRM);

  act(() => result.current.transition(RATING));
  expect(result.current.mode).toBe(RATING);

});
test("useVisualMode should not return to previous mode if already at landing", () => {
  const { result } = renderHook(() => useVisualMode(LANDING));

  act(() => result.current.back());
  expect(result.current.mode).toBe(LANDING);
});

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(LANDING));

  act(() => result.current.transition(REQUEST));
  expect(result.current.mode).toBe(REQUEST);

  act(() => result.current.transition(CONFIRM, true));
  expect(result.current.mode).toBe(CONFIRM);

  act(() => result.current.back());
  expect(result.current.mode).toBe(LANDING);
});

