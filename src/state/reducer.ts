import { Action, ActionType } from "./actions";
import { Store } from "./state";

export const createReducer = <T>() => (state: Store<T>, action: Action<T>) => {
  let newState = state;

  switch (action.type) {
    case ActionType.PLAY:
      if (!state.playing && state.frames.length) {
        const cursor =
          state.cursor === state.frames.length - 1 ? 0 : state.cursor;
        newState = {
          ...newState,
          cursor,
          playing: true,
          startCursor: cursor,
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
      if (!state.playing || !state.frames.length) break;
      newState = { ...newState, cursor: action.payload };
      if (newState.cursor >= newState.frames.length - 1) {
        newState = state.loop
          ? {
              ...newState,
              playing: true,
              startTime: Date.now(),
              startCursor: action.payload % newState.frames.length,
              cursor: action.payload % newState.frames.length,
            }
          : {
              ...newState,
              playing: false,
              startTime: null,
              startCursor: null,
              cursor: newState.frames.length - 1,
            };
      }
      break;

    case ActionType.GET_PREVIOUS_FRAME:
      if (!state.playing && state.cursor > 0)
        newState = { ...newState, cursor: state.cursor - 1 };
      break;

    case ActionType.GET_NEXT_FRAME:
      if (!state.playing && state.cursor < state.frames.length - 1)
        newState = {
          ...newState,
          cursor: (state.cursor + 1) % state.frames.length,
        };
      break;

    case ActionType.UPDATE_DURATION:
      if (!state.playing) newState = { ...newState, duration: action.payload };
      break;

    case ActionType.CLEAR:
      newState = {
        ...newState,
        frames: [],
        playing: false,
        cursor: 0,
        startTime: null,
        startCursor: null,
      };
      break;

    case ActionType.LOAD:
      newState = action.payload[2]
        ? {
            ...newState,
            frames: action.payload[0],
            duration: action.payload[1],
            playing: true,
            cursor: 0,
            startTime: Date.now(),
            startCursor: 0,
          }
        : {
            ...newState,
            frames: action.payload[0],
            duration: action.payload[1],
            playing: false,
            cursor: 0,
            startTime: null,
            startCursor: null,
          };
      break;

    case ActionType.SET_LOOP:
      newState = {
        ...newState,
        loop: action.payload,
      };
  }

  return newState;
};
