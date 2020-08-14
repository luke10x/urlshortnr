import { handleUrlListAction, handleCreateUrlAction } from './actions';
import { Response, Request } from 'express';

import { fetchUrls, insertUrl } from './db';
jest.mock('./db');

import { generateHash } from './hash';
jest.mock('./hash');

import { config } from './config';
jest.mock('./config');

describe('Handle URL list action', () => {
  config.XLINK_URL = 'https://pbid.io/';

  it('responds with what comes from database', async () => {
    const fetchUrlsMock = fetchUrls as jest.Mock;
    fetchUrlsMock.mockResolvedValue([
      { code: 'abc123', url: 'https://luke10x.dev/' },
    ]);
    const res: Partial<Response<any>> = {};
    res.send = jest.fn().mockReturnValue(res);

    await handleUrlListAction(res as Response<any>);

    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ code: 'https://pbid.io/abc123' }),
      ]),
    );
  });
});

describe('Handle create URL action', () => {
  config.XLINK_URL = 'https://pbid.io/';

  describe('success', () => {
    const req = {
      body: { url: 'https://luke10x.dev', code: 'g3n3r4t3' },
    };

    const res: Partial<Response<any>> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);

    const generateHashMock = generateHash as jest.Mock;
    generateHashMock.mockReturnValue('g3n3r4t3');

    it('saves passed URL with generated hash', async () => {
      const insertUrlMock = insertUrl as jest.Mock;

      await handleCreateUrlAction(req as Request<any>, res as Response<any>);

      expect(insertUrlMock).toHaveBeenCalledWith({
        url: 'https://luke10x.dev',
        code: 'g3n3r4t3',
      });
    });

    it('responds with created URL details', async () => {
      await handleCreateUrlAction(req as Request<any>, res as Response<any>);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        url: 'https://luke10x.dev',
        code: 'https://pbid.io/g3n3r4t3',
      });
    });
  });
});
