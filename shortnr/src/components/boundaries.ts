/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchWrapper = (...args: any): any => {
  // @ts-ignore
  return fetch(...args);
};

export const config = {
  URLSTORE_URL: process.env.VUE_APP_URLSTORE_URL
};
