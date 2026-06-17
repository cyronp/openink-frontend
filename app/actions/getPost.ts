"use server";
import { checkAuth } from "@/app/utils/auth";

export async function getPost(id: string) {
  const { token } = await checkAuth();
  
  const postUrl = `http://localhost:8080/post/${id}`;
  const contentUrl = `http://localhost:8080/contents/post/${id}`;
  const likesUrl = `http://localhost:8080/posts/${id}/likes`;
  const headers: Record<string, string> = {
    "Accept": "*/*"
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const [postRes, contentRes, likesRes] = await Promise.all([
      fetch(postUrl, { headers }),
      fetch(contentUrl, { headers }),
      fetch(likesUrl, { headers })
    ]);

    if (!postRes.ok) {
      return { success: false, error: "Failed to fetch post metadata: " + postRes.status };
    }

    const postData = await postRes.json();
    let text = "";

    if (contentRes.ok) {
      const contentData = await contentRes.json();
      text = contentData.text || "";
    } else {
      console.error("Failed to fetch post content:", await contentRes.text());
    }

    let likes = 0;
    if (likesRes.ok) {
      // Assuming the response is either a number or an object like { likes: number }
      // Or maybe an array of likes? Usually it's a count if it's just getting likes.
      const likesData = await likesRes.json();
      likes = typeof likesData === 'number' ? likesData : (likesData.likes || likesData.length || 0);
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
