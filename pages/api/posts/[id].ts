//Challenge 1:point 3
import type { NextApiRequest, NextApiResponse } from "next";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  timestamp: string; // Timestamp
}
type ErrorResponse = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorResponse>
) {
  const { id } = req.query;
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);
    const data:Post = await response.json();
    const timestamp = new Date().toISOString();
    res.status(200).json({ ...data, timestamp });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}
