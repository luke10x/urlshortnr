import { Response, Request } from 'express';
import { fetchUrls, insertUrl } from './db';
import { generateHash } from './hash';
import { config } from './config';

interface UrlEntry {
  code: string;
  url: string;
}

const recordToResponse = (record: UrlEntry) => ({
  ...record,
  code: config.XLINK_URL + record.code,
});

export const handleUrlListAction = async (res: Response<any>) => {
  const responseBody = (await fetchUrls()).map(recordToResponse);
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

  try {
    await insertUrl(newEntry);
  } catch (e) {
    if (e.code === 11000) {
      res.status(503).send({
        error: 'Wait until different code is generated and try again later',
      });
      return;
    }
    throw e;
  }

  const newEntryResponse = recordToResponse(newEntry);

  res.status(201).send(newEntryResponse);
};
