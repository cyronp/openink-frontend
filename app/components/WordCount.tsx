import Text from "@/app/components/ui/Text/Text";
import HelpModal from "../components/HelpModal/HelpModal";

export default function WordCount({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-3 tabular-nums">
      <Text as="p" className="text-xs text-muted-foreground">
        {text.length} caracteres
      </Text>
      <HelpModal />
    </span>
  );
}
