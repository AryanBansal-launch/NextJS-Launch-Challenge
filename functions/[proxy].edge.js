export default function handler(request, context) {
  console.log('edge API called')
    const parsedUrl = new URL(request.url);
    const route = parsedUrl.pathname;
    if (route === '/appliances') {
      const response = {
        time: new Date()
      }
      return new Response(JSON.stringify(response))
    }
    return fetch(request)
} 