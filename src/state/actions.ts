export type Action<T> =
  | Play
  | Pause
  | Reset
  | UpdateFpsLimit
  | UpdateDuration
  | ClearFrames
  | PushFrames<T>
  | GetPreviousFrame
  | GetNextFrame
  | SetCursor;

export enum ActionType {
  PLAY,
  PAUSE,
  RESET,
  UPDATE_FPS_LIMIT,
  UPDATE_DURATION,
  CLEAR_FRAMES,
  PUSH_FRAMES,
  GET_PREVIOUS_FRAME,
  GET_NEXT_FRAME,
  SET_CURSOR,
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

interface UpdateFpsLimit {
  type: ActionType.UPDATE_FPS_LIMIT;
  payload: number;
}

interface UpdateDuration {
  type: ActionType.UPDATE_DURATION;
  payload: number;
}

interface ClearFrames {
  type: ActionType.CLEAR_FRAMES;
}

interface PushFrames<T> {
  type: ActionType.PUSH_FRAMES;
  payload: T[];
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

export const play = (): Play => ({
  type: ActionType.PLAY,
});

export const pause = (): Pause => ({
  type: ActionType.PAUSE,
});

export const reset = (): Reset => ({
  type: ActionType.RESET,
});

export const updateFps = (payload: number): UpdateFpsLimit => ({
  type: ActionType.UPDATE_FPS_LIMIT,
  payload,
});

export const updateDuration = (payload: number): UpdateDuration => ({
  type: ActionType.UPDATE_DURATION,
  payload,
});

export const clearFrames = (): ClearFrames => ({
  type: ActionType.CLEAR_FRAMES,
});

export const pushFrames = <T>(payload: T[]): PushFrames<T> => ({
  type: ActionType.PUSH_FRAMES,
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
