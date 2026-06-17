"use client";
import { useState, useEffect } from "react";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import Link from "next/link";
import {
  Heart,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/Button/Button";
import { getPosts } from "@/app/actions/getPosts";

type FilterQuery = "all" | "weekly" | "monthly" | "alltime";

type Publication = {
  id: number;
  title: string;
  description: string;
  userId: number;
  readTime: number;
  createdAt: string;
};

const OPTIONS: { label: string; query: FilterQuery }[] = [
  { label: "TODOS", query: "all" },
  { label: "ESSA SEMANA", query: "weekly" },
  { label: "ESSE MÊS", query: "monthly" },
  { label: "TODO O TEMPO", query: "alltime" },
];

export default function ContentSection() {
  const [selectedQuery, setSelectedQuery] = useState<FilterQuery>("all");
  const [selectedPagination, setSelectedPagination] = useState(1);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchPublications() {
      setIsLoading(true);
      const res = await getPosts(
        selectedPagination - 1,
        itemsPerPage,
        "createdAt",
      );
      if (res.success && res.data) {
        setPublications(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      }
      setIsLoading(false);
    }
    fetchPublications();
  }, [selectedPagination, selectedQuery]);

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
        {isLoading ? (
          <div className="border-2 border-black p-4 text-center">
            <Text
              as="p"
              className="text-black font-bold uppercase tracking-widest"
            >
              Carregando publicações...
            </Text>
          </div>
        ) : publications.length === 0 ? (
          <div className="border-2 border-black p-4 text-center">
            <Text
              as="p"
              className="text-black font-bold uppercase tracking-widest"
            >
              Nenhuma publicação encontrada
            </Text>
          </div>
        ) : (
          publications.map((pub) => (
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
                    <User size={14} /> User {pub.userId}
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <Clock size={14} /> {pub.readTime} MIN
                  </Text>
                  <Text as="span" className="flex items-center gap-1 text-sm">
                    <Calendar size={14} />{" "}
                    {new Date(pub.createdAt).toLocaleDateString()}
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
            <Text as="span" className="hidden sm:inline">
              Anterior
            </Text>
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
