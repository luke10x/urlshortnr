/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchWrapper = (...args: any): any => {
  // @ts-ignore
  return fetch(...args);
};
