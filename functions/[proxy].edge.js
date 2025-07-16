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

const KNOWN_BOTS = ['ClaudeBot', 'GPTBot', 'Googlebot', 'Bingbot', 'AhrefsBot'];

export default function handler(request, context) {
  const userAgent = request.headers.get('user-agent') || '';
  if (KNOWN_BOTS.some(bot => userAgent.includes(bot))) {
    return new Response('Forbidden: AI crawlers are not allowed.', { status: 403 });
  }
  return fetch(request);
} 