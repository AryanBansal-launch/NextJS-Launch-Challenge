export async function getServerSideProps({ res }) {
    const content = `
  User-agent: GPTBot
  Disallow: /
  
  User-agent: ClaudeBot
  Disallow: /
  
  User-agent: *
  Disallow:
    `.trim();
  
    res.setHeader('Content-Type', 'text/plain');
    res.write(content);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default function Robots() {
    // This will never render; it's handled via getServerSideProps.
    return null;
  }
  
  
  
  
  
  
  