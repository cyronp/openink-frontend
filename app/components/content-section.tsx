"use client";
import { useState } from "react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import { Separator } from "./ui/Separator/Separator";
import Link from "next/link";

type FilterQuery = "all" | "weekly" | "monthly" | "alltime";

type Publication = {
  title: string;
  description: string;
  likeQnt: number;
  user: string;
  readTime: number;
  caracterQnt: number;
};

const publications: Publication[] = [
  {
    title: "On solitude and the art of doing nothing",
    description:
      "There is a particular kind of peace that comes only when you stop trying to fill the silence. I found it on a Tuesday, between two failed attempts at productivity.",
    likeQnt: 320,
    user: "V. Henrique",
    readTime: 6,
    caracterQnt: 2100,
  },
  {
    title: "The slow return of analogue rituals",
    description:
      "Notebooks, vinyl, darkrooms — something in us resists the frictionless. A meditation on why difficulty sometimes feels like home.",
    likeQnt: 214,
    user: "C. Moreira",
    readTime: 4,
    caracterQnt: 1540,
  },
  {
    title: "What cities forget when they grow too fast",
    description:
      "Urban memory is not stored in buildings. It lives in the habits of those who walk the streets daily, in the unwritten rules of a neighbourhood.",
    likeQnt: 481,
    user: "L. Faria",
    readTime: 9,
    caracterQnt: 3200,
  },
  {
    title: "A brief history of waiting",
    description:
      "Before push notifications, waiting was a practice. You waited for the letter, the season, the person. Perhaps patience was never a virtue — just a technology.",
    likeQnt: 892,
    user: "R. Tavares",
    readTime: 7,
    caracterQnt: 2780,
  },
  {
    title: "Testeeeee",
    description:
      "Before push noasdadtifications, waiting was a practice. You waited for the letter, the season, the person. Perhaps patience was never a virtue — just a technology.",
    likeQnt: 892,
    user: "Ronaldo. Tavares",
    readTime: 7,
    caracterQnt: 2780,
  },
];

const OPTIONS: { label: string; query: FilterQuery }[] = [
  { label: "TODOS", query: "all" },
  { label: "ESSA SEMANA", query: "weekly" },
  { label: "ESSE MÊS", query: "monthly" },
  { label: "TODO O TEMPO", query: "alltime" },
];

export default function ContentSection() {
  const [selectedQuery, setSelectedQuery] = useState<FilterQuery>("all");
  const [selectedPagination, setSelectedPagination] = useState(1);

  return (
    <div className="flex flex-col gap-4 max-w-full p-4">
      {/* Filter Options */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center w-full">
        {OPTIONS.map(({ label, query }) => (
          <Text
            as="a"
            key={query}
            onClick={() => setSelectedQuery(query)}
            className={`text-sm md:text-base lg:text-xl tracking-tight cursor-pointer whitespace-nowrap ${
              selectedQuery === query
                ? "text-primary underline"
                : "text-muted-foreground"
            }`}
          >
            {label}
          </Text>
        ))}
      </div>

      {/* Publication List */}
      {publications.length === 0 ? (
        <Text as="p" className="text-muted-foreground text-sm px-4">
          Nenhuma publicação neste período.
        </Text>
      ) : (
        publications.map((pub) => (
          <Link
            key={pub.title}
            href="/read"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-offset-2 ring-offset-background"
          >
            <div className="group w-full flex flex-col gap-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <Heading
                  as="h3"
                  className="text-lg md:text-xl font-bold group-hover:text-neutral-600"
                >
                  {pub.title}
                </Heading>

                <Text
                  as="p"
                  className="text-sm text-muted-foreground group-hover:text-neutral-400"
                >
                  {pub.description}
                </Text>

                <div className="flex flex-row md:gap-4 gap-2  text-muted-foreground group-hover:text-neutral-400 mt-1">
                  <Text as="p" className="text-xs md:text-sm">
                    ♡ {pub.likeQnt}
                  </Text>
                  <Text as="p" className="text-xs md:text-sm">
                    {pub.user}
                  </Text>
                  <Text as="p" className="text-xs md:text-sm">
                    {pub.readTime} min de leitura
                  </Text>
                  <Text as="p" className="text-xs md:text-sm">
                    {pub.caracterQnt} caracteres
                  </Text>
                </div>
              </div>

              <Separator />
            </div>
          </Link>
        ))
      )}

      {/* Pagination */}
      <div className="w-full flex flex-row gap-2 md:gap-4 items-center justify-center text-base md:text-xl py-2">
        <button
          className="cursor-pointer hover:text-neutral-500 shrink-0"
          onClick={() => setSelectedPagination((p) => Math.max(1, p - 1))}
        >
          ← <span className="hidden sm:inline">Anterior</span>
        </button>

        <div className="flex flex-row gap-1 md:gap-2">
          {[1, 2, 99].map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPagination(page)}
              className={`p-2 cursor-pointer ${
                selectedPagination === page
                  ? "text-black"
                  : "text-muted-foreground"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="cursor-pointer hover:text-neutral-500 shrink-0"
          onClick={() => setSelectedPagination((p) => p + 1)}
        >
          <span className="hidden sm:inline">Próximo</span> →
        </button>
      </div>
    </div>
  );
}
