import { handleUrlListAction } from './actions';
import { Response } from 'express';

import { fetchUrls } from './db';
jest.mock('./db');

describe('Handle URL list action', () => {
  it('What comes from database, goes to response', async () => {
    const fetchUrlsMock = fetchUrls as jest.Mock;
    fetchUrlsMock.mockResolvedValue([
      { code: 'https://pbid.io/abc123', url: 'https://luke10x.dev/' },
    ]);
    const res: Partial<Response<any>> = {};
    res.send = jest.fn().mockReturnValue(res);

    await handleUrlListAction(<Response<any>>res);

    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ code: 'https://pbid.io/abc123' }),
      ]),
    );
  });
});
