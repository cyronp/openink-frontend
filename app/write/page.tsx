"use client";

import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Button } from "../components/ui/Button/Button";
import Link from "next/link";
import { Input } from "../components/ui/Input/Input";

export default function WritePage() {
  const [markdownContent, setMarkdownContent] = useState("");

  return (
    <>
      <div>
        <Link href="/">
          <Button variant="ghost" className="w-fit">
            <ChevronLeft />
          </Button>
        </Link>
        <div className="flex flex-col px-2">
          <label>Titulo da publicação</label>
          <Input placeholder="Digite o titulo..." />
          <label>Descrição da publicação</label>
          <Input placeholder="Digite a descrição..." />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full h-screen p-2 gap-4">
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <textarea
            className="w-full h-full p-4 border rounded resize-none outline-none"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            placeholder="Digite aqui..."
          />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-auto p-4 border rounded">
          <Markdown>{markdownContent}</Markdown>
        </div>
      </div>
    </>
  );
}
