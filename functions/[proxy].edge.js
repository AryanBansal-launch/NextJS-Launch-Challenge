// export default async function handler(request) {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   const finalres = await res.json();

//   return new Response(JSON.stringify(finalres), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

export default async function handler(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  if(hostname.includes('nextjs-launch-challenge-test.devcontentstackapps.com')){
    // Check for Basic Authentication
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      // Option 1: Trigger browser's native login prompt
      return new Response('Authentication Required', { 
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Protected Area - Enter admin/admin"',
          'Content-Type': 'text/html'
        }
      });
      
      // Option 2: Redirect to custom login page (uncomment to use)
      // return Response.redirect(`${url.origin}/login?redirect=${encodeURIComponent(request.url)}`, 302);
    }
    
    try {
      // Decode the base64 credentials
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = atob(base64Credentials);
      const [username, password] = credentials.split(':');
      
      if(username === 'admin' && password === 'admin'){
        // Forward the request to the original destination
        return await fetch(request);
      } else {
        return new Response('Unauthorized - Invalid credentials', { 
          status: 401,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    } catch (error) {
      return new Response('Unauthorized - Invalid auth format', { 
        status: 401,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
  else if(hostname.includes('test-domain.devcontentstackapps.com')){
    return await fetch(request);
  }
  
  return fetch(request);
}


// export default async function handler(request) {
//   const redirectHosts = [
//     'nextjs-launch-challenge-test.devcontentstackapps.com',
//   ];

//   const url = new URL(request.url);

//   if (redirectHosts.includes(url.hostname)) {
//     url.hostname = 'www.csnonprod.com';
//     return Response.redirect(url.toString(), 308);
//   }

//   return fetch(request);
// }


//OUR REWRITE LOGIC
// export default async function handler(request) {
//   const url = new URL(request.url);
//   const path = url.pathname.toString();
//   console.log(path);
//   if(path.startsWith('/academy')){
//     console.log('inside the /academy if path');
//     try {
//       const rewrittenUrl = `https://contentstack-com-academy-dev.contentstackapps.com${path}`;
//       console.log('rewrittenUrl', rewrittenUrl);
//       const response = await fetch(new Request(rewrittenUrl, request));
//       console.log('response status', response.clone().status);
//       //console.log('response body', await response.clone().text());
//       return response;
//     } catch (error) {
//       console.log('error', error);
//       return new Response('Error with rewrite', { status: 500 });
//     }
//   }

//   // Return the original request for non-academy paths
//   return fetch(request);
// }

//NAEEM SIR REWRITE LOGIC
// export default async function handler(request) {
//   return await main(request);
//   // context.waitUntil(main(request, context));
// }

// const main = async (request) => {

//   const parsedUrl = new URL(request?.url);
//   const pathname = parsedUrl?.pathname.toString();
//   console.log('url', parsedUrl);
//   console.log(pathname);
//   if(pathname.startsWith('/academy')){
//     console.log('inside academy path');
//     try{
//       const rewrittenUrl = `https://contentstack-com-academy-dev.contentstackapps.com${pathname}`;
//       console.log('rewrittenUrl', rewrittenUrl);
//       const response = await fetch(new Request(rewrittenUrl, request));
//       console.log('response status', response.clone().status);
//       //console.log('response body', await response.clone().text());
//       return response;
//     }catch(error){
//       console.log('error', error);
//       return new Response('Error fetchign rewrite', { status: 500 });
//     }
//   }
//   console.log('skipped academy path');
//   return fetch(request);
// }


// const main = async (request) => {

//   const url = new URL(request?.url);
//   const pathname = url?.pathname.toString();

//   if(pathname.startsWith('/academy')){
//     const rewrittenUrl = `https://contentstack-com-academy-dev.contentstackapps.com${pathname}`;

//     const response = await fetch(new Request(rewrittenUrl, request));
//     if (!response.ok) {
//       return new Response(`Error: ${response.status}`, { status: response.status });
//     }

//     const responseBody = await response.text();

//     return new Response(responseBody, {
//       status: 200,
//       headers: {
//         'content-type': response.headers.get('content-type') || 'text/html',
//       },
//     });
//   }
//   return fetch(request);
// }









