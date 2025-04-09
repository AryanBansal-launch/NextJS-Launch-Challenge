// index.tsx (you can rename it to .tsx for TypeScript syntax highlighting)
import React from 'react'
import { GetServerSidePropsContext } from 'next'

interface datatype {
  userId: number
  id: number
  title: string
  body: string
}

interface Props {
  data: datatype[]
  timestamp: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  // Set cache control
  context.res.setHeader('cache-control', 'max-age=0, s-maxage=86400')

  // Get server-side timestamp
  const timestamp = new Date().toISOString()

  return { props: { data, timestamp } }
}

function IndexPage({ data, timestamp }: Props) {
  return (
    <div>
      <h1>Index Page</h1>
      <p>This is an SSR page that uses cache headers.</p>
      <p><strong>Page Generated At:</strong> {new Date(timestamp).toLocaleString()}</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
