import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=10, stale-while-revalidate=3600');
  res.status(200).json({
    message: "Testing Cache Behavior",
    timestamp: new Date().toISOString(),
  });
}
