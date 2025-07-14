// middleware.ts (or .js) at the root of your project
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const KNOWN_BOTS = ['ClaudeBot', 'GPTBot', 'Googlebot', 'Bingbot', 'AhrefsBot'];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  for (const bot of KNOWN_BOTS) {
    if (userAgent.includes(bot)) {
      console.log(`[BOT VISIT] ${bot} visited ${request.nextUrl.pathname}`);
      // You could also send this to an external log system or database
      break;
    }
  }

  return NextResponse.next();
}
