"use client";

import { useState } from "react";
import Text from "../ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";
import { XIcon } from "lucide-react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import { NameLoginSchema, type NameLogin } from "@/app/schema/NameLoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginModal({ onClose }: { onClose?: () => void }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<NameLogin>({
    resolver: zodResolver(NameLoginSchema),
  });

  const [isToken, setIsToken] = useState(false);

  function toggleTokenLogin() {
    setIsToken(!isToken);
  }

  function closeModal() {
    if (onClose) onClose();
  }
  const onSubmit = (data: NameLogin) => {
    console.log("Dados enviados:", data);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text className="text-center font-semibold text-sm text-muted-foreground">
              Insira um apelido para acessar
            </Text>
            <Separator />
            <Text className="" as="label">
              Insira seu apelido
            </Text>
            <Input className="w-full border" placeholder="Seu apelido"></Input>
            {errors.name && <Text as="span" className="text-red-500">{errors.name.message}</Text>}
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
            <Button size="lg" type="submit" variant="default">
              Acessar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
