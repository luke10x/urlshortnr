import { Response, Request } from 'express';
import { fetchUrls, insertUrl } from './db';
import { generateHash } from './hash';
import { config } from './config';

interface UrlEntry {
  code: string, url: string
};

const recordToResponse = (record: UrlEntry) => ({
  ...record,
  code: config.XLINK_URL + record.code
});

export const handleUrlListAction = async (res: Response<any>) => {
  const responseBody = (await fetchUrls()).map(recordToResponse);
  console.log('RB', responseBody);
  res.send(responseBody);
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

  const newEntryResponse = recordToResponse(newEntry);

  res.status(201).send(newEntryResponse);
};
