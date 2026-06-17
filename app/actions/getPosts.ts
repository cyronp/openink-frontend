"use server";
import { checkAuth } from "@/app/utils/auth";

export async function getPosts(page: number, size: number, sort: string = "createdAt,desc") {
  const { token } = await checkAuth();
  
  const url = `http://localhost:8080/post?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`;
  const headers: Record<string, string> = {
    "Accept": "*/*"
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      return { success: false, error: "Failed to fetch posts: " + res.status };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
