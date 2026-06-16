import Link from "next/link";
import MarkdownPreview from "../components/MarkdownPreview";
import { Button } from "../components/ui/Button/Button";
import { ChevronLeft, Heart, Clock, AlignLeft } from "lucide-react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import ReportModal from "../components/ReportModal/ReportModal";

const content = {
  title: "Exemplo de titulo de publicação",
  description: "Exemplo de descrição de publicação",
  content:
    "# Lorem ipsum dolor sit, amet consectetur adipisicing elit.\n ## Autem nemo delectus et, provident ducimus perferendis pariatur eligendi?\n ### Libero beatae, laboriosam odit tenetur, suscipit fuga iure quasi blanditiis asperiores repudiandae voluptatibus? Explicabo molestiae soluta odit sit nemo corporis sed eveniet minus ipsum? Rerum a pariatur sapiente ipsam amet eum repudiandae perferendis!",
  author: {
    name: "João Silva",
  },
  publishedAt: "10 de junho de 2026",
  likes: 42,
};

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export default function Read() {
  const chars = content.content.length;
  const minutes = readingTime(content.content);

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
            {content.title}
          </Heading>

          <Text as="p" className="text-muted-foreground leading-snug font-medium">
            {content.description}
          </Text>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-black py-4 mt-4 gap-4">
            <div className="flex flex-col">
              <Text
                as="p"
                className="font-semibold text-black tracking-tight"
              >
                Autor(a): {content.author.name}
              </Text>
              <Text as="p" className="text-sm text-black">
                Publicado em: {content.publishedAt}
              </Text>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground uppercase">
                <Button size="fit" variant="ghost">
                  <Heart size={18} strokeWidth={2} />
                </Button>
                {content.likes} curtidas
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

        <MarkdownPreview content={content.content} />

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
