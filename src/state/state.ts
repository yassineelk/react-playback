export type Store<T> = {
  duration: number;
  frames: T[];
  cursor: number;
  loop: boolean;
} & (
  | { playing: true; startTime: number; startCursor: number }
  | { playing: false; startTime: null; startCursor: null }
);

export const getDefaultState = <T>(
  frames: T[] = [],
  duration: number,
  autoplay: boolean = false
): Store<T> =>
  autoplay
    ? {
        duration,
        frames,
        cursor: 0,
        playing: true,
        startTime: Date.now(),
        startCursor: 0,
        loop: false,
      }
    : {
        duration,
        frames,
        cursor: 0,
        playing: false,
        startTime: null,
        startCursor: null,
        loop: false,
      };
