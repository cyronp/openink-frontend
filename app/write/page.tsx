"use client";

import { useState } from "react";
import { Eye, PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";

import { WritePostSchema, type WritePost } from "../schema/WritePostSchema";

import FieldError from "@/app/components/FieldError";
import WordCount from "@/app/components/WordCount";
import MarkdownPreview from "@/app/components/MarkdownPreview";
import WriteHeader from "../components/Headers/WriteHeader";
import { createPost } from "./actions";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WritePost>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const form = watch();

  const submitPost = async (data: WritePost) => {
    setIsSubmitting(true);
    try {
      const result = await createPost(data);
      if (result.success) {
        alert("Post criado com sucesso!");
        router.push("/");
      } else {
        alert("Erro ao criar post: " + result.error);
      }
    } catch (error) {
      alert("Erro inesperado ao criar post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <WriteHeader isSubmitting={isSubmitting} />

      <div className="md:hidden flex border-b border-border">
        <button
          onClick={() => setActiveTab("write")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs uppercase tracking-widest transition-colors ${
            activeTab === "write"
              ? "text-foreground border-b-2 border-foreground"
              : "text-muted-foreground"
          }`}
        >
          <PenLine size={11} />
          Escrever
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs uppercase tracking-widest transition-colors ${
            activeTab === "preview"
              ? "text-foreground border-b-2 border-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Eye size={11} />
          Preview
        </button>
      </div>

      <form
        id="writePostForm"
        onSubmit={handleSubmit(submitPost)}
        className="flex flex-col flex-1"
      >
        <div
          className={`max-w-6xl mx-auto w-full px-4 pt-8 pb-6 ${
            activeTab === "preview" ? "hidden md:block" : "block"
          }`}
        >
          <div className="max-w-2xl flex flex-col gap-3">
            <input
              type="text"
              placeholder="Título da publicação"
              {...register("title")}
              className="w-full text-3xl font-semibold bg-transparent border-none outline-none placeholder:text-muted-foreground"
            />
            <FieldError error={errors.title} />

            <input
              type="text"
              placeholder="Uma breve descrição do post..."
              {...register("description")}
              className="w-full text-sm bg-transparent border-none outline-none text-muted-foreground"
            />
            <FieldError error={errors.description} />

            <Separator />

            <WordCount text={form.content} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 pb-8 flex-1">
          <div className="flex gap-6 h-full min-h-[calc(100vh-260px)]">
            <div
              className={`w-full md:w-1/2 flex flex-col gap-4 ${
                activeTab === "preview" ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="hidden md:flex items-center justify-between">
                <Text
                  as="p"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  <PenLine size={11} />
                  Editor
                </Text>
                <FieldError error={errors.content} />
              </div>

              <div className="md:hidden">
                <FieldError error={errors.content} />
              </div>

              <textarea
                {...register("content")}
                placeholder={`## Comece a escrever...\n\nUse **negrito**, *itálico*, [links](url), e muito mais com Markdown.`}
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-sm font-mono leading-7 min-h-[50vh] md:min-h-0"
              />
            </div>

            <Separator className="hidden md:block h-auto w-px self-stretch" />

            <div
              className={`w-full md:w-1/2 flex flex-col gap-4 ${
                activeTab === "write" ? "hidden md:flex" : "flex"
              }`}
            >
              <Text
                as="p"
                className="hidden md:flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground"
              >
                <Eye size={11} />
                Preview
              </Text>

              <div className="flex-1 overflow-auto">
                <MarkdownPreview
                  title={form.title}
                  description={form.description}
                  content={form.content}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
