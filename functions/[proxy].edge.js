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

export default async function handler(request) {
  const redirectHosts = [
    'nextjs-launch-challenge-test.devcontentstackapps.com',
  ];

  const url = new URL(request.url);

  if (redirectHosts.includes(url.hostname)) {
    url.hostname = 'www.csnonprod.com';
    return Response.redirect(url.toString(), 308);
  }

  return fetch(request);
}