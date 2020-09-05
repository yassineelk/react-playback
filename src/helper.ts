export const wait = (ms: number): Promise<any> =>
  new Promise((resolve) => setTimeout(resolve, ms));
