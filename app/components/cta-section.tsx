import Heading from "./ui/Heading/Heading";
import { Input } from "./ui/Input/Input";
import { Separator } from "./ui/Separator/Separator";

export default function CTASection() {
  return (
    <div className="flex flex-col justify-center items-center p-6 gap-6">
      <Heading as="h2" className="font-normal text-3xl italic text-center">
        Sem Conta. Sem algoritmo. Apenas escrita.
      </Heading>
      <Input
        placeholder="Pesquise temas, assuntos, histórias..."
        className="w-full"
      ></Input>
      <Separator />
    </div>
  );
}
