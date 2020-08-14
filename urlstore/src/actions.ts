import { Response } from 'express';
import { fetchUrls } from './db';

export const handleUrlListAction = async (res: Response<any>) => {
  res.send(await fetchUrls());
};
