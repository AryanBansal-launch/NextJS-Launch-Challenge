// export default function handler(request, context) {
//   // console.log('edge API called')
//     const parsedUrl = new URL(request.url);
//     const route = parsedUrl.pathname;
//     if (route === '/appliances') {
//       const response = {
//         time: new Date()
//       }
//       return new Response(JSON.stringify(response))
//     }
//     return fetch(request)
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
export default async function handler(request) {
  return await main(request);
  // context.waitUntil(main(request, context));
}

const main = async (request) => {

  const parsedUrl = new URL(request?.url);
  const pathname = parsedUrl?.pathname.toString();
  console.log('url', parsedUrl);
  console.log(pathname);
  if(pathname.startsWith('/academy')){
    console.log('inside academy path');
    try{
      const rewrittenUrl = `https://contentstack-com-academy-dev.contentstackapps.com`;
      console.log('rewrittenUrl', rewrittenUrl);
      const response = await fetch(new Request(rewrittenUrl, request));
      console.log('response status', response.clone().status);
      //console.log('response body', await response.clone().text());
      return response;
    }catch(error){
      console.log('error', error);
      return new Response('Error fetchign rewrite', { status: 500 });
    }
  }
  console.log('skipped academy path');
  return fetch(request);
}










