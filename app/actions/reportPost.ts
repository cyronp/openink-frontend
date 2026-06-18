"use server";

import { checkAuth } from "@/app/utils/auth";

export async function reportPost(postId: number, type: string) {
  const { loggedIn, token } = await checkAuth();

  if (!loggedIn || !token) {
    return { success: false, error: "Você precisa estar logado para enviar uma denúncia." };
  }

  const payload = {
    postId,
    type,
  };

  try {
    const response = await fetch("http://localhost:8080/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: text || "Erro ao enviar a denúncia." };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Erro ao conectar-se com o servidor." };
  }
}
