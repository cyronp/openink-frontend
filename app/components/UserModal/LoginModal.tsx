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
import {
  TokenLoginSchema,
  type TokenLogin,
} from "@/app/schema/TokenLoginSchema";
import { loginWithName, loginWithToken } from "@/app/utils/auth";

export default function LoginModal({ onClose, message }: { onClose?: () => void; message?: string | null }) {
  const [isToken, setIsToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const nameForm = useForm<NameLogin>({
    resolver: zodResolver(NameLoginSchema),
  });

  const tokenForm = useForm<TokenLogin>({
    resolver: zodResolver(TokenLoginSchema),
  });

  function toggleTokenLogin() {
    setIsToken(!isToken);
    setApiError(null);
  }

  function closeModal() {
    if (onClose) onClose();
  }

  const submitNameLogin = async (data: NameLogin) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await loginWithName(data.name);
      if (res.success) {
        closeModal();
        window.location.reload();
      } else {
        setApiError(res.error || "Ocorreu um erro ao fazer login.");
      }
    } catch (err: any) {
      setApiError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitTokenLogin = async (data: TokenLogin) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await loginWithToken(data.token);
      if (res.success) {
        closeModal();
        window.location.reload();
      } else {
        setApiError(res.error || "Ocorreu um erro ao fazer login.");
      }
    } catch (err: any) {
      setApiError(err.message || "Erro ao salvar o token.");
    } finally {
      setIsLoading(false);
    }
  };

  if (message) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
        <div className="bg-white w-full max-w-135 p-6 relative shadow-2xl flex flex-col gap-4">
          <Button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
            aria-label="Fechar"
          >
            <XIcon />
          </Button>
          <Text className="text-center font-semibold text-xl">Aviso</Text>
          <Separator />
          <Text className="text-center text-base font-medium text-foreground py-4">
            {message}
          </Text>
          <Button onClick={closeModal} size="lg" variant="default" className="mt-2 w-full">
            Entendi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      {isToken ? (
        <div className="bg-white w-full max-w-135 p-6 relative max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col gap-2">
          <Button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
            aria-label="Fechar"
            disabled={isLoading}
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
          <form
            id="tokenOnlyForm"
            onSubmit={tokenForm.handleSubmit(submitTokenLogin)}
          >
            <div className="flex flex-col gap-2">
              <Text className="">Insira seu token</Text>
              <Input
                className="w-full border"
                placeholder="eyJhbGciOiJIUzI1NiIs..."
                disabled={isLoading}
                {...tokenForm.register("token")}
              />
              {tokenForm.formState.errors.token && (
                <Text as="span" className="text-red-500">
                  {tokenForm.formState.errors.token.message}
                </Text>
              )}
              <div className="flex flex-row gap-2 items-center">
                <Text className="text-left text-base">Ou</Text>
                <Button
                  type="button"
                  size="fit"
                  className="font-semibold underline cursor-pointer text-sm"
                  onClick={toggleTokenLogin}
                  disabled={isLoading}
                >
                  entre com apelido
                </Button>
              </div>
              {apiError && (
                <Text as="span" className="text-red-500 text-sm font-semibold text-center my-1">
                  {apiError}
                </Text>
              )}
              <Button
                size="lg"
                variant="default"
                form="tokenOnlyForm"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Acessando..." : "Acessar"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white w-full max-w-135 p-6 relative max-h-[96vh] overflow-y-auto shadow-2xl flex flex-col gap-2">
          <Button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={closeModal}
            aria-label="Fechar"
            disabled={isLoading}
          >
            <XIcon />
          </Button>
          <Text className="text-center font-semibold text-xl">Bem vindo!</Text>
          <form
            onSubmit={nameForm.handleSubmit(submitNameLogin)}
            id="nameOnlyForm"
            method="POST"
          >
            <div className="flex flex-col gap-2">
              <Text className="text-center font-semibold text-sm text-muted-foreground">
                Insira um apelido para acessar
              </Text>
              <Separator />
              <Text className="" as="label">
                Insira seu apelido
              </Text>
              <Input
                className="w-full border"
                placeholder="Seu apelido"
                disabled={isLoading}
                {...nameForm.register("name")}
              />
              {nameForm.formState.errors.name && (
                <Text as="span" className="text-red-500">
                  {nameForm.formState.errors.name.message}
                </Text>
              )}
              <div className="flex flex-row gap-2 items-center">
                <Text className="text-left text-base">Ou</Text>
                <Button
                  type="button"
                  size="fit"
                  className="font-semibold underline cursor-pointer text-sm"
                  onClick={toggleTokenLogin}
                  disabled={isLoading}
                >
                  entre com seu token
                </Button>
              </div>
              {apiError && (
                <Text as="span" className="text-red-500 text-sm font-semibold text-center my-1">
                  {apiError}
                </Text>
              )}
              <Button
                size="lg"
                type="submit"
                variant="default"
                form="nameOnlyForm"
                disabled={isLoading}
              >
                {isLoading ? "Acessando..." : "Acessar"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

