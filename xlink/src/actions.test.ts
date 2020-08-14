import { handleRedirectAction } from './actions';
import { Response, Request } from 'express';

import { fetchUrlByCode } from './db';
jest.mock('./db');

describe('handle redirect', () => {
  beforeEach(() => jest.clearAllMocks());

  const req = {
    params: { code: 'code10xx' },
  };

  const res: Partial<Response<any>> = {};
  res.redirect = jest.fn();

  const fetchUrlByCodeMock = fetchUrlByCode as jest.Mock;
  beforeEach(() => {
    fetchUrlByCodeMock.mockResolvedValue({
      code: 'code10xx',
      url: 'https://luke10x.dev/',
    });
  });

  it('fetches URL using code from request', async () => {
    await handleRedirectAction(req as Request<any>, res as Response<any>);
    expect(fetchUrlByCodeMock).toHaveBeenCalledWith('code10xx');
  });

  it('redirects to the url from database', async () => {
    await handleRedirectAction(req as Request<any>, res as Response<any>);
    expect(res.redirect).toHaveBeenCalledWith(301, 'https://luke10x.dev/');
  });
});
