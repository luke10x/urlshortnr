import { Response, Request } from 'express';
import { fetchUrlByCode } from './db';

export const handleRedirectAction = async (
  req: Request<any>,
  res: Response<any>,
) => {
  const code = req.params.code;
  const { url: targetUrl } = (await fetchUrlByCode(code)) as { url: string };
  console.log(code);

  res.redirect(301, targetUrl);
};
