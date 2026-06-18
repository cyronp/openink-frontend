"use server";
import { checkAuth } from "@/app/utils/auth";

export async function getPost(id: string) {
  const { token } = await checkAuth();
  
  const postUrl = `http://localhost:8080/post/${id}`;
  const headers: Record<string, string> = {
    "Accept": "*/*"
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const postRes = await fetch(postUrl, { headers });

    if (!postRes.ok) {
      return { success: false, error: "Failed to fetch post metadata: " + postRes.status };
    }

    const postData = await postRes.json();

    const contentUrl = `http://localhost:8080/contents/post/${postData.id}`;
    const likesUrl = `http://localhost:8080/posts/${postData.id}/likes`;

    const [contentRes, likesRes] = await Promise.all([
      fetch(contentUrl, { headers }),
      fetch(likesUrl, { headers })
    ]);

    let text = "";
    if (contentRes.ok) {
      const contentData = await contentRes.json();
      text = contentData.text || "";
    } else {
      console.error("Failed to fetch post content:", await contentRes.text());
    }

    let likes = 0;
    if (likesRes.ok) {
      const likesData = await likesRes.json();
      likes = typeof likesData === 'number' ? likesData : (likesData.numberLikes ?? likesData.likes ?? 0);
    } else {
      console.error("Failed to fetch post likes:", await likesRes.text());
    }

    return { 
      success: true, 
      data: {
        ...postData,
        text,
        likes
      } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
