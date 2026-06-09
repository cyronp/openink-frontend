import Text from "@/app/components/ui/Text/Text";

type Props = {
  error?: {
    message?: string;
  };
};

export default function FieldError({ error }: Props) {
  if (!error) return null;

  return (
    <Text as="span" className="text-xs text-red-500">
      {error.message}
    </Text>
  );
}
