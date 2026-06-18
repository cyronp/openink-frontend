import Link from "next/link";
import MarkdownPreview from "../components/MarkdownPreview";
import { Button } from "../components/ui/Button/Button";
import { ChevronLeft, Clock, AlignLeft, User, Calendar } from "lucide-react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import ReportModal from "../components/ReportModal/ReportModal";
import LikeButton from "../components/LikeButton/LikeButton";
import { getPost } from "@/app/actions/getPost";
import { getUser } from "@/app/actions/getUser";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Read({ params }: PageProps) {
  const { slug } = await params;
  const res = await getPost(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;
  const userRes = await getUser(post.userId);
  const authorName = userRes.success ? userRes.data.name : `User ${post.userId}`;
  const textContent = post.text || "";
  const chars = textContent.length;
  const minutes = post.readTime || Math.ceil((textContent.trim().split(/\s+/).length || 0) / 200);

  return (
    <div className="min-h-screen bg-neutral-50/30 flex flex-col antialiased">
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        <div className="max-w-6xl mx-auto flex w-full flex-row items-center justify-between py-3.5 px-6 relative">
          <Button
            variant="ghost"
            className="flex items-center cursor-pointer z-10 text-neutral-600 hover:text-neutral-900 text-sm font-semibold normal-case gap-1"
            asChild
          >
            <Link href="/">
              <ChevronLeft size={16} strokeWidth={2.5} />
              Voltar
            </Link>
          </Button>
          <Heading className="absolute left-1/2 -translate-x-1/2 text-2xl font-normal tracking-tighter text-neutral-900">
            open<span className="italic">ink</span>
          </Heading>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-12 pb-24 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Heading
            as="h1"
            className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-neutral-900 break-words"
          >
            {post.title}
          </Heading>

          <Text as="p" className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed break-words">
            {post.description}
          </Text>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-neutral-200 py-6 my-4 gap-6">
            <div className="flex flex-col gap-1">
              <Text
                as="p"
                className="font-bold text-neutral-900 text-sm md:text-base leading-tight"
              >
                Autor(a): {authorName}
              </Text>
              <Text as="p" className="text-xs text-neutral-500">
                Publicado em {new Date(post.createdAt).toLocaleDateString()}
              </Text>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <LikeButton postId={post.id} initialLikes={post.likes || 0} />
              <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
              <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <Clock size={15} strokeWidth={2.5} />
                {minutes} min
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <AlignLeft size={15} strokeWidth={2.5} />
                {chars} chars
              </span>
            </div>
          </div>
        </div>

        <article className="w-full prose prose-neutral max-w-none">
          <MarkdownPreview content={textContent} />
        </article>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-neutral-200 mt-6">
          <Text as="span" className="text-xs md:text-sm font-bold uppercase text-neutral-500 tracking-wider">
            Considera este conteúdo ofensivo?
          </Text>
          <ReportModal postId={post.id} />
        </div>
      </main>
    </div>
  );
}
