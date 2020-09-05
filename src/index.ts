import { useEffect, useReducer, useMemo } from "react";
import { createReducer } from "./state/reducer";
import { getDefaultState } from "./state/state";
import {
  play,
  pause,
  reset,
  updateFps,
  updateDuration,
  clearFrames,
  pushFrames,
  getPreviousFrame,
  getNextFrame,
  setCursor,
} from "./state/actions";

export const usePlayback = <T>(
  frames: T[],
  duration?: number
): [T | null, boolean, IPlayBack<T>] => {
  const [state, dispatch] = useReducer(createReducer<T>(), undefined, () =>
    getDefaultState(frames, duration)
  );

  useEffect(() => {
    if (!state.playing) return;
    const frameDuration = Math.min(
      1000 / state.fpsLimit,
      state.duration ? state.duration / state.frames.length : -Infinity
    );

    let interval = setInterval(() => {
      const elapsedTime = Date.now() - state.startTime;
      const newCursor = Math.min(
        Math.ceil(elapsedTime / frameDuration) + state.startCursor,
        state.frames.length - 1
      );
      dispatch(setCursor(newCursor));
    }, 1);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.playing, state.duration, state.fpsLimit, state.frames.length]);

  return [
    state.frames[state.cursor],
    state.playing,
    useMemo(
      () => ({
        getPrev: () => dispatch(getPreviousFrame()),
        getNext: () => dispatch(getNextFrame()),
        play: () => dispatch(play()),
        pause: () => dispatch(pause()),
        reset: () => dispatch(reset()),
        setFPS: (fps: number) => dispatch(updateFps(fps)),
        setDuration: (duration: number) => dispatch(updateDuration(duration)),
        clear: () => dispatch(clearFrames()),
        pushFrames: (frames: T[]) => dispatch(pushFrames(frames)),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        dispatch,
        getPreviousFrame,
        getNextFrame,
        play,
        pause,
        reset,
        updateFps,
        updateDuration,
        clearFrames,
        pushFrames,
      ]
    ),
  ];
};

interface IPlayBack<T> {
  getPrev: () => void;
  getNext: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setFPS: (fps: number) => void;
  setDuration: (duration: number) => void;
  clear: () => void;
  pushFrames: (frames: T[]) => void;
}
