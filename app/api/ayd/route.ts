import { NextRequest, NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs/server'
export const revalidate = 0;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const user = await currentUser()
  const { url } = await fetch("https://www.askyourdatabase.com/api/chatbot/v2/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.AYD_API_KEY}`
    },
    body: JSON.stringify({
      "chatbotid": process.env.AYD_CHATBOT_ID,
      "name": user?.username,
      "email": user?.primaryEmailAddressId,
    }),
  }).then((res) => res.json());

  return NextResponse.json({ url });
}