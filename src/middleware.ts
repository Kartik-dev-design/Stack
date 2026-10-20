import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreatedb from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storage.collection";
export async function middleware(request: NextRequest) {
   await Promise.all([
    getOrCreatedb(),
    getOrCreateStorage(),
   ])
  return NextResponse.next()
}
export const config={
    matcher:[ "/login"
        ,"/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}
