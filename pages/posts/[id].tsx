//Challenge 1:point 4
import { GetStaticProps, GetStaticPaths } from "next";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  timestamp: string;
}
const PostPage = ({ post }: { post: Post }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="p-6 max-w-2xl mx-auto text-center bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📝 Post {post.id}
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600">{post.title}</h2>
        <p className="text-gray-700 mt-4">{post.body}</p>
        <p className="text-red-700 font-bold text-lg mt-4">
          <strong>Timestamp:</strong> {post.timestamp}
        </p>
      </div>
    </div>
  );
};

export default PostPage;

//this will do for all paths dynamically
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.id;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${postId}`;

  console.log("posts url Fetching from:", url);

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`API responded with status: ${response.status}`);

    const data: Post = await response.json();
    return { props: { post: data }, revalidate: 10 };
  } catch (error) {
    console.error("Fetch failed:", error);
    return { notFound: true };
  }
};
