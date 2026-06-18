"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button/Button";
import { XIcon } from "lucide-react";
import Text from "../ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";
import { Select } from "../ui/Select/Select";
import { ReportSchema, ReportFormValues } from "@/app/schema/ReportSchema";
import FieldError from "../FieldError";
import { reportPost } from "@/app/actions/reportPost";

interface ReportModalProps {
  postId: number;
}

export default function ReportModal({ postId }: ReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      reportType: "",
    },
  });

  const myOptions = [
    { label: "Conteúdo Impróprio", value: "CONTEUDO_IMPROPRIO" },
    { label: "Nome Impróprio", value: "NOME_IMPROPRIO" },
    { label: "Outros", value: "OUTROS" },
  ];

  const onSubmit = async (data: ReportFormValues) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);
    try {
      const res = await reportPost(postId, data.reportType);
      if (res.success) {
        setSuccessMessage("Denúncia enviada com sucesso!");
        reset();
      } else {
        setApiError(res.error || "Ocorreu um erro ao enviar a denúncia.");
      }
    } catch (err: any) {
      setApiError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setApiError(null);
    setSuccessMessage(null);
    reset();
  };

  return (
    <>
      <Button
        className="text-red-500 text-base gap-1"
        variant="ghost"
        size="fit"
        onClick={() => setIsOpen(true)}
      >
        Denunciar
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white w-full max-w-135 p-6 relative shadow-2xl flex flex-col gap-2">
            <Button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleClose}
              aria-label="Fechar"
              disabled={isLoading}
            >
              <XIcon />
            </Button>

            <Text className="text-center font-semibold text-xl">
              Canal de denúncias
            </Text>

            <Separator />

            {successMessage ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <Text className="text-green-600 font-semibold text-center">
                  {successMessage}
                </Text>
                <Button variant="default" onClick={handleClose}>
                  Fechar
                </Button>
              </div>
            ) : (
              <form
                id="reportForm"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Text as="label" className="block mb-2 font-medium">
                    Selecione a categoria da denúncia
                  </Text>

                  <Controller
                    name="reportType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={myOptions}
                        placeholder="Selecione..."
                        value={field.value}
                        onChange={field.onChange}
                        className={errors.reportType ? "border-red-500" : ""}
                      />
                    )}
                  />

                  <FieldError error={errors.reportType} />
                </div>

                {apiError && (
                  <Text as="span" className="text-red-500 text-sm font-semibold text-center">
                    {apiError}
                  </Text>
                )}

                <Button variant="default" type="submit" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar Denúncia"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

