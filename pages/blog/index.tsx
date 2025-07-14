import { GetStaticProps } from 'next';

type Post = {
  id: number;
  title: string;
};

type BlogProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  // Fetch posts from JSONPlaceholder (random placeholder API)
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const data: Post[] = await res.json();

  return {
    props: {
      posts: data,
    }
  };
};

export default function Blog({ posts }: BlogProps) {
  return (
    <div>
      <h1>Blog Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
