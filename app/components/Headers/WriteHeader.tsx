"use client";

import Link from "next/link";
import { ChevronLeft, PenLine, Eye } from "lucide-react";
import { Button } from "@/app/components/ui/Button/Button";
import Heading from "@/app/components//ui/Heading/Heading";

interface WriteHeaderProps {
  wordCount?: string;
  isSubmitting?: boolean;
}
export default function WriteHeader({ isSubmitting }: WriteHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-sm shrink-0"
          asChild
        >
          <Link href="/">
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
        </Button>

        <Heading className="absolute left-1/2 -translate-x-1/2 text-base font-normal tracking-tighter pointer-events-none">
          open<span className="italic">ink</span>
        </Heading>

        <Button
          type="submit"
          form="writePostForm"
          variant="default"
          className="cursor-pointer shrink-0"
          size="md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publicando..." : "Publicar"}
        </Button>
      </div>
    </header>
  );
}
