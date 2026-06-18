"use server";

import { cookies } from "next/headers";

/**
 * Log in / Register a user with their name by posting to http://localhost:8080/auth
 * Saves the returned JWT token to nextjs cookies.
 */
export async function loginWithName(name: string) {
  try {
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: errorText || "Erro ao autenticar." };
    }

    const data = await response.json();
    const token = typeof data === "string" ? data : (data.token || data.accessToken || data.jwt);

    if (!token) {
      return { success: false, error: "Token não recebido do servidor." };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erro no login:", error);
    return { success: false, error: error.message || "Erro de conexão com o servidor." };
  }
}



/**
 * Log out the user by deleting the token cookie.
 */
export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro ao fazer logout." };
  }
}

/**
 * Check if the user is authenticated from the server side.
 */
export async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return { loggedIn: !!token, token };
  } catch (error) {
    return { loggedIn: false };
  }
}
