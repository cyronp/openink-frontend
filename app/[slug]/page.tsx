import Link from "next/link";
import MarkdownPreview from "../components/MarkdownPreview";
import { Button } from "../components/ui/Button/Button";
import { ChevronLeft, Clock, AlignLeft, User, Calendar, Heart } from "lucide-react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import ReportModal from "../components/ReportModal/ReportModal";
import { getPost } from "@/app/actions/getPost";
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
  const textContent = post.text || "";
  const chars = textContent.length;
  const minutes = post.readTime || Math.ceil((textContent.trim().split(/\s+/).length || 0) / 200);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-300">
        <div className="flex w-full flex-row items-center justify-between py-4 px-6 relative">
          <Button
            variant="ghost"
            className="flex items-center cursor-pointer z-10"
            asChild
          >
            <Link href="/">
              <ChevronLeft size={16} />
              Voltar
            </Link>
          </Button>
            <Heading className="text-2xl font-normal tracking-tighter">
              open<span className="italic">ink</span>
            </Heading>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 pt-12 pb-24 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <Heading
            as="h1"
            className="text-lg md:text-2xl font-bold leading-none tracking-tighter text-black"
          >
            {post.title}
          </Heading>

          <Text as="p" className="text-muted-foreground leading-snug font-medium">
            {post.description}
          </Text>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-black py-4 mt-4 gap-4">
            <div className="flex flex-col gap-2">
              <Text
                as="p"
                className="font-semibold text-black tracking-tight flex items-center gap-2"
              >
                <User size={16} /> Autor(a): User {post.userId}
              </Text>
              <Text as="p" className="text-sm text-black flex items-center gap-2">
                <Calendar size={16} /> Publicado em: {new Date(post.createdAt).toLocaleDateString()}
              </Text>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
                <Button size="fit" variant="ghost" className="pointer-events-none">
                  <Heart size={18} strokeWidth={2} />
                </Button>
                {post.likes || 0} curtidas
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
                <Clock size={18} strokeWidth={2} />
                {minutes} min
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
                <AlignLeft size={18} strokeWidth={2} />
                {chars} char
              </span>
            </div>
          </div>
        </div>

        <MarkdownPreview content={textContent} />

        <div className="flex items-center gap-3 pt-8 border-t border-black mt-8">
          <Text as="span" className="text-xs md:text-sm font-bold uppercase text-black">
            Considera o conteudo ofensivo?
          </Text>
          <ReportModal />
        </div>
      </main>
    </div>
  );
}
