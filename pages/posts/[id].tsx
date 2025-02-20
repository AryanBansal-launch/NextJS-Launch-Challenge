//Challenge 1:point 4
import { GetStaticProps, GetStaticPaths } from "next";

interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
  timestamp: string; //timestamp
}
const PostPage = ({ post }: { post: Post }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>📝 Post {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <strong>Timestamp:</strong> {post.timestamp}
      </p>
    </div>
  );
};

export default PostPage;


//this will do for all paths dynamically
export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } },
        { params: { id: '4' } },
        { params: { id: '5' } },
      ],
      fallback:'blocking', 
    };
  };
export const getStaticProps: GetStaticProps = async ({params}) => {
  const postId = params?.id;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${postId}`;
  const response = await fetch(url);
  const data: Post = await response.json();
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  };
};

