"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { likePost, getLikes } from "@/app/actions/likes";
import LoginModal from "../UserModal/LoginModal";

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await likePost(postId);
      if (res.success) {
        setIsLiked(true);
        // Refresh likes count
        const likesRes = await getLikes(postId);
        if (likesRes.success) {
          setLikes(likesRes.likes);
        } else {
          setLikes((prev) => prev + 1);
        }
      } else {
        if (
          res.error?.includes("autenticado") ||
          res.error?.includes("logado") ||
          res.error?.includes("authenticated")
        ) {
          setShowLogin(true);
        } else {
          console.error("Erro ao curtir:", res.error);
        }
      }
    } catch (err: any) {
      console.error("Erro ao curtir:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
        <Button
          size="fit"
          variant="ghost"
          onClick={handleLike}
          disabled={isLoading}
          className={`cursor-pointer transition-all duration-200 ${
            isLiked ? "text-red-500 hover:text-red-600 scale-110" : "hover:text-red-500 hover:scale-110"
          }`}
          aria-label="Curtir publicação"
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={isLiked ? "fill-current" : ""}
          />
        </Button>
        {likes} {likes === 1 ? "curtida" : "curtidas"}
      </span>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          message="Você precisa estar logado para curtir esta publicação."
        />
      )}
    </>
  );
}
