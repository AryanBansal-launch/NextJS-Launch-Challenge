//Challenge 1:point 1
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Movie {
  id: number;
  Title: string;
  Year:string;
  Runtime: string;
  Poster: string;
}

export default function Home({ movies }: { movies: Movie[] }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px',display:'flex',flexDirection:'column',alignItems:'center' }}>
      <h1 style={{ fontSize: '40px', margin: '20px 0' }}>Aryan NextJS task</h1>
      <h1 style={{ fontSize: '40px', margin: '20px 0' }}>Cartoon: Ben 10</h1>
      <Image src="/cartoon.jpg" alt="Ben-10" width={500} height={500} />
      <h2 style={{ fontSize: '40px', margin: '20px 0' , marginTop:'100px'}}>Some Other Movies</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ fontSize: '18px', margin: '10px 0' }}>
            🎬 {movie.Title}
          </li>
        ))}
      </ul>
      <Link href="/shuffle-products">Go to shuffle products</Link>
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
