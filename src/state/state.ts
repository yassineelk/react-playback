const DEFAULT_FPS_LIMIT = 30;

export type Store<T> = {
  fpsLimit: number;
  duration: number | undefined;
  frames: T[];
  cursor: number;
} & (
  | { playing: true; startTime: number; startCursor: number }
  | { playing: false; startTime: null; startCursor: null }
);

export const getDefaultState = <T>(
  frames: T[] = [],
  duration?: number,
  fpsLimit: number = DEFAULT_FPS_LIMIT
): Store<T> => ({
  fpsLimit,
  duration,
  frames,
  cursor: 0,
  playing: false,
  startTime: null,
  startCursor: null,
});
