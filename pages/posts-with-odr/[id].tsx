//Challenge 1:point 5
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  timestamp: string;
}

const PostPage = ({ post }: { post: Post }) => {
  const [message, setMessage] = useState("");

  const handleRevalidate = async () => {
    setMessage("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id }),
      }
    );

    const data = await response.json();
    if (data.revalidated) {
      setMessage(
        "Post revalidated successfully! Refresh the page to see updates."
      );
    } else {
      setMessage("Failed to revalidate the post.");
    }
  };

  return (
    // <div>
    //   <h1>{post.id}</h1>
    //   <h1>{post.title}</h1>
    //   <p>{post.body}</p>
    //   <p>
    //     <strong>Timestamp:</strong> {post.timestamp}
    //   </p>

    //   <button
    //     onClick={handleRevalidate}
    //     className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
    //   >
    //     Revalidate Post
    //   </button>

    //   {message && <p>{message}</p>}
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
  <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">📝 Post {post.id}</h1>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
    <p className="text-gray-600 mb-4">{post.body}</p>
    <p className="text-gray-700 font-medium">
      <strong>Timestamp:</strong> {post.timestamp}
    </p>

    <button
      onClick={handleRevalidate}
      className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
    >
      Revalidate Post
    </button>

    {message && <p className="mt-3 text-green-600 font-medium">{message}</p>}
  </div>
</div>

  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  if (!id) return { notFound: true };
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${id}`;
  console.log("posts-with-odr Fetching from:", url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
    const post: Post = await res.json();
    return {
      props: { post },
      revalidate: 40,
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return { notFound: true };
  }
};
