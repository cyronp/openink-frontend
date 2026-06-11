import Link from "next/link";
import MarkdownPreview from "../components/MarkdownPreview";
import { Button } from "../components/ui/Button/Button";
import { ChevronLeft, Heart, Clock, AlignLeft } from "lucide-react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import { Separator } from "@/app/components/ui/Separator/Separator";

const content = {
  title: "Exemplo de titulo de publicação",
  description: "Exemplo de descrição de publicação",
  content:
    "# Lorem ipsum dolor sit, amet consectetur adipisicing elit. ## Autem nemo delectus et, provident ducimus perferendis pariatur eligendi? ### Libero beatae, laboriosam odit tenetur, suscipit fuga iure quasi blanditiis asperiores repudiandae voluptatibus? Explicabo molestiae soluta odit sit nemo corporis sed eveniet minus ipsum? Rerum a pariatur sapiente ipsam amet eum repudiandae perferendis!",
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
        </div>
      </header>

      <main className="max-w-360 mx-auto w-full px-4 pt-10 pb-16 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Heading as="h1" className="text-3xl font-semibold leading-tight">
            {content.title}
          </Heading>

          <Text
            as="p"
            className="text-muted-foreground text-base leading-relaxed"
          >
            {content.description}
          </Text>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex flex-col">
              <Text as="p" className="text-base font-medium">
                Autor(a): {content.author.name}
              </Text>
              <Text as="p" className="text-sm text-muted-foreground">
                Publicado em: {content.publishedAt}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Button variant="ghost" size="fit">
                <Heart size={16} />
              </Button>
              <Text
                as="p"
                className="text-xs lg:text-base text-muted-foreground"
              >
                {content.likes} curtidas
              </Text>
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={16} />
              <Text
                as="p"
                className="text-xs lg:text-base text-muted-foreground"
              >
                {minutes} min de leitura
              </Text>
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlignLeft size={16} />
              <Text
                as="p"
                className="text-xs lg:text-base text-muted-foreground"
              >
                {chars} caracteres
              </Text>
            </span>
          </div>
        </div>
        <div className="inline-flex gap-1">
            <Text as="span" className="text-base text-muted-foreground">Este é um conteudo impróprio?</Text>
            <Button className="text-red-500 text-base gap-1" variant="ghost" size="fit">Denunciar</Button>
        </div>

        <Separator />

        <MarkdownPreview content={content.content} />
      </main>
    </div>
  );
}
