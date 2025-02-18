//Challenge 1:point 1
import Image from 'next/image';
import { GetStaticProps } from 'next';

interface Movie {
  id: number;
  Title: string;
  Year:string;
  Runtime: string;
  Poster: string;
}

export default function Home({ movies }: { movies: Movie[] }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Ben-10: The Animated Series</h1>
      <Image src="/cartoon.jpg" alt="Ben-10" width={400} height={300} />
      <h2>Some Other Movies</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ fontSize: '18px', margin: '10px 0' }}>
            🎬 {movie.Title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Fetch data at build time
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies'
  );
  const movies: Movie[] = await response.json();

  return {
    props: {
      movies,
    },
    revalidate: 30, 
  };
};
