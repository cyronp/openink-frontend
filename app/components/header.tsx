import Heading from "./Heading/Heading";
import Text from "./Text/Text";

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center py-4 px-6 gap-9 border-b border-neutral-300">
      <Heading className="text-2xl font-normal tracking-tighter">
        open<span className="italic">ink</span>
      </Heading>
      <ul className="flex flex-row gap-4 items-center px-8 text-ellipsis w-full overflow-hidden">
        <Text as="li" className="text-xl tracking-tight text-ellipsis">TODOS</Text>
        <Text as="li" className="text-xl tracking-tight text-muted-foreground">ESSA SEMANA</Text>
        <Text as="li" className="text-xl tracking-tight text-muted-foreground">ESSE MÊS</Text>
        <Text as="li" className="text-xl tracking-tight text-muted-foreground">TODO O TEMPO</Text>
      </ul>
      <button className="underline text-xl cursor-pointer uppercase">
        ESCREVA
      </button>
    </div>
  );
}
