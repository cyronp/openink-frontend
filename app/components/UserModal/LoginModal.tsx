"use client";

import { useState } from "react";
import Text from "../ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";
import { XIcon } from "lucide-react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";

export default function LoginModal({ onClose }: { onClose?: () => void }) {
  const [isToken, setIsToken] = useState(false);

  function toggleTokenLogin() {
    setIsToken(!isToken);
  }

  function closeModal() {
    if (onClose) onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      {isToken ? (
        <div className="bg-white rounded-xl w-full max-w-135 p-6 relative max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col gap-2">
          <Button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
            aria-label="Fechar"
          >
            <XIcon />
          </Button>
          <Text className="text-center font-semibold text-xl">
            Token de acesso
          </Text>
          <Text className="text-center font-semibold text-sm text-muted-foreground">
            Insira seu token para acessar
          </Text>
          <Separator />
          <Text className="">Insira seu token</Text>
          <Input
            className="w-full border"
            placeholder="eyJhbGciOiJIUzI1NiIs..."
          ></Input>
          <div className="flex flex-row gap-2 items-center">
            <Text className="text-left text-base">Ou</Text>
            <Button
              size="fit"
              className="font-semibold underline cursor-pointer text-sm"
              onClick={toggleTokenLogin}
            >
              entre com apelido
            </Button>
          </div>
          <Button size="lg" variant="default">
            Acessar
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl w-full max-w-135 p-6 relative max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col gap-2">
          <Button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
            aria-label="Fechar"
          >
            <XIcon />
          </Button>
          <Text className="text-center font-semibold text-xl">Bem vindo!</Text>
          <Text className="text-center font-semibold text-sm text-muted-foreground">
            Insira um apelido para acessar
          </Text>
          <Separator />
          <Text className="">Insira seu apelido</Text>
          <Input className="w-full border" placeholder="Seu apelido"></Input>
          <div className="flex flex-row gap-2 items-center">
            <Text className="text-left text-base">Ou</Text>
            <Button
              size="fit"
              className="font-semibold underline cursor-pointer text-sm"
              onClick={toggleTokenLogin}
            >
              entre com seu token
            </Button>
          </div>
          <Button size="lg" variant="default">
            Acessar
          </Button>
        </div>
      )}
    </div>
  );
}
