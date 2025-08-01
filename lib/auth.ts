"use server"

import { cookies } from "next/headers"

export async function setAuthToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value
}

export async function removeAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
