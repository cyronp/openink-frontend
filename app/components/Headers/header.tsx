import Heading from "../ui/Heading/Heading";
import UserButton from "../UserModal/UserButton";

export default function Header() {
  return (
    <div className="flex w-full flex-row justify-between items-center py-4 px-6 gap-9 border-b border-neutral-300">
      <Heading className="text-2xl font-normal tracking-tighter pointer-events-none">
        open<span className="italic">ink</span>
      </Heading>
      <div className="flex flex-row gap-4 items-center">
        <UserButton />
      </div>
    </div>
  );
}
