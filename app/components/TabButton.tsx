import { LucideIcon } from "lucide-react";
import Text from "@/app/components/ui/Text/Text";

type Props = {
  active: boolean;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
};

export default function TabButton({
  active,
  icon: Icon,
  children,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-background text-muted-foreground hover:bg-muted"
      }`}
    >
      <Icon size={12} />

      <Text as="p" className="text-xs">
        {children}
      </Text>
    </button>
  );
}