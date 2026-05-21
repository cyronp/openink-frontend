
import Heading from "./Heading/Heading";
import Text from "./Text/Text"
export default function Header() {
  return (
    <div className="flex w-full flex-row justify-between items-center py-4 px-6 gap-9 border-b border-neutral-300">
      <Heading className="text-2xl font-normal tracking-tighter">
        open<span className="italic">ink</span>
      </Heading>
      <button className="underline text-xl cursor-pointer uppercase">
        ESCREVA
      </button>
    </div>
  );
}
