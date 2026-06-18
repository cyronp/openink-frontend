"use server";

import { checkAuth } from "@/app/utils/auth";

export async function getLikes(postId: number) {
  const { token } = await checkAuth();
  
  const url = `http://localhost:8080/posts/${postId}/likes`;
  const headers: Record<string, string> = {
    "Accept": "*/*"
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) {
      return { success: false, error: "Failed to fetch likes: " + res.status };
    }
    const data = await res.json();
    // The endpoint returns { "numberLikes": 0 }
    return { success: true, likes: data.numberLikes ?? 0 };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function likePost(postId: number) {
  const { loggedIn, token } = await checkAuth();

  if (!loggedIn || !token) {
    return { success: false, error: "Você precisa estar logado para curtir esta publicação." };
  }

  const url = `http://localhost:8080/posts/${postId}/likes`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: text || "Falha ao curtir a publicação." };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erro de conexão com o servidor." };
  }
}
