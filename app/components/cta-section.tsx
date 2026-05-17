import Heading from "./Heading/Heading";

export default function CTASection() {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-9 gap-6">
        <Heading as="h2" className="font-normal text-3xl italic">
          Sem Conta. Sem algoritmo. Apenas escrita.
        </Heading>
        <input
          placeholder="Pesquise temas, assuntos, histórias..."
          className="w-full py-3 px-6 border border-muted-foreground"
        ></input>
    </div>
  );
}
