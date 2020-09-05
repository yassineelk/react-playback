export type Action<T> =
  | Play
  | Pause
  | Reset
  | UpdateDuration
  | Clear
  | Load<T>
  | GetPreviousFrame
  | GetNextFrame
  | SetCursor
  | SetLoop;

export enum ActionType {
  LOAD,
  GET_PREVIOUS_FRAME,
  GET_NEXT_FRAME,
  PLAY,
  PAUSE,
  RESET,
  UPDATE_DURATION,
  CLEAR,
  SET_CURSOR,
  SET_LOOP,
}

interface Play {
  type: ActionType.PLAY;
}

interface Pause {
  type: ActionType.PAUSE;
}

interface Reset {
  type: ActionType.RESET;
}

interface UpdateDuration {
  type: ActionType.UPDATE_DURATION;
  payload: number;
}

interface Clear {
  type: ActionType.CLEAR;
}

interface Load<T> {
  type: ActionType.LOAD;
  payload: [T[], number, boolean];
}

interface GetPreviousFrame {
  type: ActionType.GET_PREVIOUS_FRAME;
}

interface GetNextFrame {
  type: ActionType.GET_NEXT_FRAME;
}

interface SetCursor {
  type: ActionType.SET_CURSOR;
  payload: number;
}

interface SetLoop {
  type: ActionType.SET_LOOP;
  payload: boolean;
}

export const play = (): Play => ({
  type: ActionType.PLAY,
});

export const pause = (): Pause => ({
  type: ActionType.PAUSE,
});

export const reset = (): Reset => ({
  type: ActionType.RESET,
});

export const updateDuration = (payload: number): UpdateDuration => ({
  type: ActionType.UPDATE_DURATION,
  payload,
});

export const clear = (): Clear => ({
  type: ActionType.CLEAR,
});

export const load = <T>(payload: [T[], number, boolean]): Load<T> => ({
  type: ActionType.LOAD,
  payload,
});

export const getPreviousFrame = (): GetPreviousFrame => ({
  type: ActionType.GET_PREVIOUS_FRAME,
});

export const getNextFrame = (): GetNextFrame => ({
  type: ActionType.GET_NEXT_FRAME,
});

export const setCursor = (payload: number): SetCursor => ({
  type: ActionType.SET_CURSOR,
  payload,
});

export const setLoop = (payload: boolean): SetLoop => ({
  type: ActionType.SET_LOOP,
  payload,
});
