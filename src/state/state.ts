export type Store<T> = {
  duration: number;
  frames: T[];
  cursor: number;
  autoplay: boolean;
} & (
  | { playing: true; startTime: number; startCursor: number }
  | { playing: false; startTime: null; startCursor: null }
);

export const getDefaultState = <T>(
  frames: T[] = [],
  duration: number,
  autoplay: boolean = false
): Store<T> => ({
  duration,
  frames,
  cursor: 0,
  playing: false,
  startTime: null,
  startCursor: null,
  autoplay,
});
