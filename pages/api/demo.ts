import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'This is a protected API endpoint!',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.url,
    headers: {
      host: req.headers.host,
      authorization: req.headers.authorization ? 'Present' : 'Not present'
    }
  });
}
