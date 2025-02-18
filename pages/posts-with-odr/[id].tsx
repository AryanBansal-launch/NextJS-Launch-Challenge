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

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${process.env.MY_SECRET_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id }),
    });

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
    <div>
      <h1>{post.id}</h1>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        <strong>Timestamp:</strong> {post.timestamp}
      </p>

      <button onClick={handleRevalidate}>Revalidate Post</button>

      {message && <p>{message}</p>}
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${id}`
  );
  const post = await res.json();

  return {
    props: { post },
    revalidate: 40,
  };
};
