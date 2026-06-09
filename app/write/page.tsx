"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Eye, PenLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";
import { Button } from "../components/ui/Button/Button";

import { WritePostSchema, type WritePost } from "../schema/WritePostSchema";

import FieldError from "@/app/components/FieldError";
import WordCount from "@/app/components/WordCount";
import TabButton from "@/app/components/TabButton";
import MarkdownPreview from "@/app/components/MarkdownPreview";

export default function WritePage() {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

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

  const submitPost = (data: WritePost) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center cursor-pointer"
            asChild
          >
            <Link href="/">
              <ChevronLeft size={16} />
              Voltar
            </Link>
          </Button>

          <Button
            type="submit"
            form="writePostForm"
            className="cursor-pointer"
            variant="default"
          >
            Publicar
          </Button>
        </div>
      </header>

      <form id="writePostForm" onSubmit={handleSubmit(submitPost)}>
        <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-6">
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
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full px-4 pb-8">
          <div className="flex gap-6 min-h-[calc(100vh-220px)]">
            <div
              className={`w-full md:w-1/2 flex flex-col gap-4 ${
                activeTab === "preview" ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="flex items-center justify-between">
                <Text
                  as="p"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  <PenLine size={11} />
                  Editor
                </Text>

                <FieldError error={errors.content} />
                <div className="flex items-center gap-3">
                  <WordCount text={form.content} />

                  <div className="md:hidden flex border border-border rounded-md overflow-hidden">
                    <TabButton
                      active={activeTab === "write"}
                      icon={PenLine}
                      onClick={() => setActiveTab("write")}
                    >
                      Escrever
                    </TabButton>

                    <TabButton
                      active={activeTab === "preview"}
                      icon={Eye}
                      onClick={() => setActiveTab("preview")}
                    >
                      Preview
                    </TabButton>
                  </div>
                </div>
              </div>

              <textarea
                {...register("content")}
                placeholder={`## Comece a escrever...\n\nUse **negrito**, *itálico*, [links](url), e muito mais com Markdown.`}
                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-sm font-mono leading-7"
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
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground"
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
