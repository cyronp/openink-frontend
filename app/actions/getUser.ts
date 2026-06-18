"use server";

import { checkAuth } from "@/app/utils/auth";

export async function getUser(id: number) {
  const { token } = await checkAuth();
  
  const url = `http://localhost:8080/user/${id}`;
  const headers: Record<string, string> = {
    "Accept": "*/*"
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) {
      return { success: false, error: "Failed to fetch user: " + res.status };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
