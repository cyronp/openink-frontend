"use client";

import { useState } from "react";
import Text from "../ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";
import { XIcon, Copy, Check } from "lucide-react";
import { Button } from "../ui/Button/Button";

interface ExportTokenModalProps {
  token: string;
  onClose: () => void;
}

export default function ExportTokenModal({
  token,
  onClose,
}: ExportTokenModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Falha ao copiar o token:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white w-full max-w-135 p-6 relative max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col gap-4">
        <Button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
          aria-label="Fechar"
        >
          <XIcon />
        </Button>

        <Text className="text-center font-semibold text-xl">
          Token de Acesso
        </Text>

        <Separator />

        <Text className="text-center text-sm text-muted-foreground leading-relaxed">
          Para nunca perder suas postagens e likes salve seu token de acesso e
          utilize entre outros dispositivos e sessões.
        </Text>

        <div className="flex flex-col gap-2 mt-2">
          <div className="relative">
            <textarea
              readOnly
              value={token}
              className="w-full h-24 p-3 text-xs font-mono border rounded-md bg-neutral-50 border-neutral-300 resize-none outline-none break-all"
            />
          </div>

          <Button
            size="lg"
            variant="default"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copiar Token
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
