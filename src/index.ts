import { useEffect, useReducer, useMemo } from "react";
import { createReducer } from "./state/reducer";
import { getDefaultState } from "./state/state";
import {
  play,
  pause,
  reset,
  updateDuration,
  clear,
  loadFrames,
  getPreviousFrame,
  getNextFrame,
  setCursor,
  setLoop,
} from "./state/actions";

export const usePlayback = <T>(
  frames: T[],
  duration: number,
  autoplay: boolean = false
): [T | null, boolean, IPlayBack<T>, boolean] => {
  const [state, dispatch] = useReducer(createReducer<T>(), undefined, () =>
    getDefaultState(frames, duration, autoplay)
  );

  useEffect(() => {
    if (!state.playing) return;
    const frameDuration = state.duration / state.frames.length;

    let interval = setInterval(() => {
      const playTime = Date.now() - state.startTime;
      const newCursor = Math.ceil(playTime / frameDuration) + state.startCursor;
      dispatch(setCursor(newCursor));
    });

    return () => clearInterval(interval);
  }, [state.playing, state.duration, state.frames.length]);

  return [
    state.frames[state.cursor],
    state.playing,
    useMemo(
      () => ({
        clear: () => dispatch(clear()),
        load: (frames: T[], duration: number, autoplay: boolean = false) =>
          dispatch(loadFrames([frames, duration, autoplay])),
        getPrevFrame: () => dispatch(getPreviousFrame()),
        getNextFrame: () => dispatch(getNextFrame()),
        play: () => dispatch(play()),
        pause: () => dispatch(pause()),
        reset: () => dispatch(reset()),
        setDuration: (duration: number) => dispatch(updateDuration(duration)),
        setLoop: (isLoop: boolean) => dispatch(setLoop(isLoop)),
      }),
      [
        dispatch,
        clear,
        loadFrames,
        getPreviousFrame,
        getNextFrame,
        play,
        pause,
        reset,
        updateDuration,
        setLoop,
      ]
    ),
    state.loop,
  ];
};

interface IPlayBack<T> {
  clear: () => void;
  load: (frames: T[], duration: number, autoplay?: boolean) => void;
  getPrevFrame: () => void;
  getNextFrame: () => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (duration: number) => void;
  setLoop: (isLoop: boolean) => void;
}
