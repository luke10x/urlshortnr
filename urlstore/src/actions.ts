import { Response, Request } from 'express';
import { fetchUrls, insertUrl } from './db';
import { generateHash } from './hash';

export const handleUrlListAction = async (res: Response<any>) => {
  res.send(await fetchUrls());
};

export const handleCreateUrlAction = async (
  req: Request<any>,
  res: Response<any>,
) => {
  const newEntry = {
    code: generateHash(),
    url: req.body.url,
  };

  insertUrl(newEntry);

  res.status(201).send(newEntry);
};
