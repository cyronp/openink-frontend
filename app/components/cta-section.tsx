import Heading from "./ui/Heading/Heading";
import { Separator } from "./ui/Separator/Separator";

export default function CTASection() {
  return (
    <div className="flex flex-col justify-center items-center p-6 gap-6">
      <Heading as="h2" className="font-normal text-3xl italic text-center">
        Sem Conta. Sem algoritmo. Apenas escrita.
      </Heading>
      <input
        placeholder="Pesquise temas, assuntos, histórias..."
        className="w-full py-3 px-6 border border-muted-foreground"
      ></input>
      <Separator />
    </div>
  );
}
