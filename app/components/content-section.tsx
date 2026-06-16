"use client";
import { useState } from "react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import Link from "next/link";
import {
  Heart,
  User,
  Clock,
  AlignLeft,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/Button/Button";

type FilterQuery = "all" | "weekly" | "monthly" | "alltime";

type Publication = {
  id: string;
  title: string;
  description: string;
  likeQnt: number;
  user: string;
  readTime: number;
  caracterQnt: number;
};

const publications: Publication[] = [
  {
    id: "1",
    title: "On solitude and the art of doing nothing",
    description:
      "There is a particular kind of peace that comes only when you stop trying to fill the silence. I found it on a Tuesday, between two failed attempts at productivity.",
    likeQnt: 320,
    user: "V. Henrique",
    readTime: 6,
    caracterQnt: 2100,
  },
  {
    id: "2",
    title: "The slow return of analogue rituals",
    description:
      "Notebooks, vinyl, darkrooms — something in us resists the frictionless. A meditation on why difficulty sometimes feels like home.",
    likeQnt: 214,
    user: "C. Moreira",
    readTime: 4,
    caracterQnt: 1540,
  },
  {
    id: "3",
    title: "What cities forget when they grow too fast",
    description:
      "Urban memory is not stored in buildings. It lives in the habits of those who walk the streets daily, in the unwritten rules of a neighbourhood.",
    likeQnt: 481,
    user: "L. Faria",
    readTime: 9,
    caracterQnt: 3200,
  },
  {
    id: "4",
    title: "A brief history of waiting",
    description:
      "Before push notifications, waiting was a practice. You waited for the letter, the season, the person. Perhaps patience was never a virtue — just a technology.",
    likeQnt: 892,
    user: "R. Tavares",
    readTime: 7,
    caracterQnt: 2780,
  },
  {
    id: "5",
    title: "The paradox of choice in modern design",
    description:
      "When every option is available, no option feels right. How limiting your palette can unexpectedly expand your creativity.",
    likeQnt: 531,
    user: "A. Silva",
    readTime: 5,
    caracterQnt: 1950,
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

  const itemsPerPage = 3;
  const totalPages = Math.ceil(publications.length / itemsPerPage);

  const startIndex = (selectedPagination - 1) * itemsPerPage;
  const currentPublications = publications.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setSelectedPagination(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full px-4">
      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 items-center justify-center w-full border-b-2 border-black p-2">
        {OPTIONS.map(({ label, query }) => (
          <Button
            key={query}
            onClick={() => {
              setSelectedQuery(query);
              setSelectedPagination(1);
            }}
            className={`text-sm md:text-base font-bold uppercase px-4 py-2 border-2 transition-all ${
              selectedQuery === query
                ? "border-black bg-black text-white"
                : "border-transparent text-black hover:border-black"
            }`}
          >
            <Text as="span">{label}</Text>
          </Button>
        ))}
      </div>

      {/* Publication List */}
      <div className="flex flex-col gap-2">
        {currentPublications.length === 0 ? (
          <div className="border-2 border-black p-4 text-center">
            <Text
              as="p"
              className="text-black font-bold uppercase tracking-widest"
            >
              Nenhuma publicação encontrada
            </Text>
          </div>
        ) : (
          currentPublications.map((pub) => (
            <Link
              key={pub.id}
              href={`/${pub.id}`}
              className="group block border-2 border-b-black border-transparent hover:border-black p-4 md:p-6 transition-all focus:outline-none focus:border-black"
            >
              <div className="flex flex-col gap-4">
                <Heading
                  as="h3"
                  className="text-xl font-bold uppercase tracking-tighter text-black group-hover:underline decoration-4 underline-offset-4"
                >
                  {pub.title}
                </Heading>

                <Text
                  as="p"
                  className="text-base font-medium text-black leading-snug"
                >
                  {pub.description}
                </Text>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-semibold uppercase">
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <Heart size={14} /> {pub.likeQnt}
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <User size={14} /> {pub.user}
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <Clock size={14} /> {pub.readTime} MIN
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <AlignLeft size={14} /> {pub.caracterQnt} CARACTERES
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <Calendar size={14}/> Publicado em: 20/12/2025
                  </Text>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center p-4">
          <Button
            variant="default"
            disabled={selectedPagination === 1}
            onClick={() =>
              handlePageChange(Math.max(1, selectedPagination - 1))
            }
            className="flex items-center gap-2 px-4 py-2 border-2 border-black font-bold uppercase text-sm disabled:opacity-30 hover:bg-black hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-black cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            <Text as="span" className="hidden sm:inline">Anterior</Text>
          </Button>

          <div className="flex flex-row gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <Button
                variant="ghost"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center border-2 border-black font-bold text-sm transition-colors cursor-pointer ${
                    selectedPagination === page
                      ? "bg-black text-white"
                      : "text-black hover:bg-neutral-200"
                  }`}
                >
                  <Text as="span">{page}</Text>
                </Button>
              );
            })}
          </div>

          <Button
            variant="default"
            disabled={selectedPagination === totalPages}
            onClick={() =>
              handlePageChange(Math.min(totalPages, selectedPagination + 1))
            }
            className="flex items-center gap-2 px-4 py-2 border-2 border-black font-bold uppercase text-sm disabled:opacity-30 hover:bg-black hover:text-white transition-colors disabled:hover:bg-transparent disabled:hover:text-black cursor-pointer"
          >
            <Text as="span" className="hidden sm:inline">
              Próximo
            </Text>
            <ArrowRight size={18} strokeWidth={2.5} />
          </Button>
        </div>
      )}
    </div>
  );
}
