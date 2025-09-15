export default async function handler(request) {
  try {
    const headers = new Headers();
    headers.set("Host", "https://test-domain.devcontentstackapps.com");

    // Ask the origin to return JSON (helps avoid content-negotiation issues)
    headers.set("Accept", "application/json");
    const res = await fetch(`${request.url.split('/api')[0]}/api/hello`, { headers });
    // Read the entire body of the response as text for logging/returning
    const text = await res.text();

    // Log status code for debugging (200, 404, etc.)
    console.log("status", res.status);

    // Log the server header returned (helps confirm origin vs CF Worker)
    console.log("server", res.headers.get("server"));

    // Log Cloudflare's cache status header (HIT, MISS, EXPIRED, etc.)
    console.log("cf-cache-status", res.headers.get("cf-cache-status"));

    // Log the first 200 characters of the body so you can quickly inspect it
    console.log("sample", text.slice(0, 200));

    // Return the fetched body back to the client, reusing the origin status
    return new Response(text, { status: res.status });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}



//CUSTOM PASSWORD PROTECTION FOR DOMAIN
// export default async function handler(request) {
//   const url = new URL(request.url);
//   const hostname = url.hostname;
  
//   if(hostname.includes('nextjs-launch-challenge-test.devcontentstackapps.com')){
//     // Check for Basic Authentication
//     const authHeader = request.headers.get('Authorization');
    
//     if (!authHeader || !authHeader.startsWith('Basic ')) {
//       // Option 1: Trigger browser's native login prompt
//       return new Response('Authentication Required', { 
//         status: 401,
//         headers: {
//           'WWW-Authenticate': 'Basic realm="Protected Area - Enter admin/admin"',
//           'Content-Type': 'text/html'
//         }
//       });
//     }
    
//     try {
//       // Decode the base64 credentials
//       const base64Credentials = authHeader.split(' ')[1];
//       const credentials = atob(base64Credentials);
//       const [username, password] = credentials.split(':');
      
//       if(username === 'admin' && password === 'admin'){
//         // Forward the request to the original destination
//         return await fetch(request);
//       } else {
//         return new Response('Unauthorized - Invalid credentials', { 
//           status: 401,
//           headers: { 'Content-Type': 'text/plain' }
//         });
//       }
//     } catch {
//       return new Response('Unauthorized - Invalid auth format', { 
//         status: 401,
//         headers: { 'Content-Type': 'text/plain' }
//       });
//     }
//   }
//   else if(hostname.includes('test-domain.devcontentstackapps.com')){
//     return await fetch(request);
//   }
  
//   return fetch(request);
// } 


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









