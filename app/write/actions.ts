"use server";

import { checkAuth } from "@/app/utils/auth";
import { WritePost } from "@/app/schema/WritePostSchema";

export async function createPost(data: WritePost) {
  const { loggedIn, token } = await checkAuth();

  if (!loggedIn || !token) {
    return { success: false, error: "Not authenticated" };
  }

  const words = data.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / 200);

  const payload = {
    title: data.title,
    description: data.description,
    readTime: readTime,
    text: data.content,
  };

  try {
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: text || "Failed to create post" };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to connect to server" };
  }
}
