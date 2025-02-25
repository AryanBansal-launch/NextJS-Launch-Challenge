// //challenge 1:point 5
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
//   if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
//     return res.status(401).json({ message: 'Invalid token' })
//   }

//   const { id } = req.body;
//   if (!id) {
//     return res.status(400).json({ message: "Post ID is required" });
//   }

//   try {
//     await res.revalidate(`/posts-with-odr/${id}`);
//     return res.json({ revalidated: true });
//   } catch (error) {
//     return res.status(500).json({ message: "Revalidation failed", error });
//   }
// }
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, secret } = req.body;

  // Validate Secret Key
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid secret key" });
  }

  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    // Revalidate the affected page
    const path = `/posts-with-odr/${id}`;
    await res.revalidate(path);

    console.log(`Revalidated ${path}`);
    return res.json({ revalidated: true, path });
  } catch (error) {
    console.error("Error revalidating:", error);
    return res.status(500).json({ message: "Error revalidating page" });
  }
}
