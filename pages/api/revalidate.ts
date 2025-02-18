//challenge 1:point 5
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    await res.revalidate(`/posts-with-odr/${id}`);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).json({ message: "Revalidation failed", error });
  }
}
