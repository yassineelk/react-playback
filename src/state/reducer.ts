import { produce, current } from "immer";
import { Action, ActionType } from "./actions";
import { Store } from "./state";

export const createReducer = <T>() => (state: Store<T>, action: Action<T>) => {
  let newState = state;

  switch (action.type) {
    case ActionType.PLAY:
      if (!state.playing) {
        const cursor =
          state.cursor === state.frames.length - 1 ? 0 : state.cursor;
        newState = {
          ...newState,
          cursor,
          playing: true,
          startCursor: state.cursor,
          startTime: Date.now(),
        };
      }
      break;

    case ActionType.PAUSE:
      if (state.playing)
        newState = {
          ...newState,
          playing: false,
          startTime: null,
          startCursor: null,
        };
      break;

    case ActionType.RESET:
      newState = {
        ...newState,
        playing: false,
        cursor: 0,
        startTime: null,
        startCursor: null,
      };
      break;

    case ActionType.SET_CURSOR:
      if (!state.playing) break;
      newState = { ...newState, cursor: action.payload };
      if (newState.cursor === newState.frames.length - 1) {
        newState = {
          ...newState,
          playing: false,
          startTime: null,
          startCursor: null,
        };
      }
      break;

    case ActionType.GET_PREVIOUS_FRAME:
      if (!state.playing && state.cursor > 0)
        newState = { ...newState, cursor: state.cursor - 1 };
      break;

    case ActionType.GET_NEXT_FRAME:
      if (!state.playing && state.cursor < state.frames.length - 1)
        newState = { ...newState, cursor: state.cursor + 1 };
      break;

    case ActionType.UPDATE_FPS_LIMIT:
      if (!state.playing) newState = { ...newState, fpsLimit: action.payload };
      break;

    case ActionType.UPDATE_DURATION:
      if (!state.playing) newState = { ...newState, duration: action.payload };
      break;

    case ActionType.CLEAR_FRAMES:
      newState = {
        ...newState,
        frames: [],
        playing: false,
        cursor: 0,
        startTime: null,
        startCursor: null,
      };
      break;

    case ActionType.PUSH_FRAMES:
      if (!state.playing)
        newState = {
          ...newState,
          frames: state.frames.length
            ? produce(state.frames, (draft) => {
                for (let frame of action.payload) {
                  (draft as T[]).push(frame);
                }
              })
            : action.payload,
        };
      break;
  }

  return newState;
};
