/* eslint-disable @typescript-eslint/ban-ts-ignore */
export const fetchWrapper = (...args: any): any => {

  // @ts-ignore
  return fetch(...args);
}