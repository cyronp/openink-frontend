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

export default function ReportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      reportType: "",
    },
  });

  const myOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ];

  const onSubmit = (data: ReportFormValues) => {
    console.log("Formulário válido! Dados:", data);
  };

  return (
    <>
      <Button
        className="text-red-500 text-base gap-1"
        variant="ghost"
        size="fit"
        onClick={() => setIsOpen(!isOpen)}
      >
        Denunciar
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
          <div className="bg-white w-full max-w-135 p-6 relative shadow-2xl flex flex-col gap-2">
            <Button
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
            >
              <XIcon />
            </Button>

            <Text className="text-center font-semibold text-xl">
              Canal de denúncias
            </Text>

            <Separator />
            <form
              id="reportForm"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <Text as="label">Selecione a categoria da denuncia</Text>

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

                {errors.reportType && (
                  <span className="text-sm text-red-500">
                    {errors.reportType.message}
                  </span>
                )}
              </div>
              <Button variant="default" type="submit">
                Enviar Denuncia
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
