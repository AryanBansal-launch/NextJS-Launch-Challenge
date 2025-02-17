import { GetStaticProps, GetStaticPaths } from "next";

interface Post {
  userId: number;
  id: number;
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

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postId = params?.id;
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  const response = await fetch(url);
  const data: Post = await response.json();
  return {
    props: {
      post: data,
    },
    revalidate: 10
  };
};
