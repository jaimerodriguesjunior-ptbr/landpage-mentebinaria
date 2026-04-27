"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CircleCheck } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation/lead";

type FormState = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const sourceUrl = useMemo(
    () => (typeof window !== "undefined" ? window.location.href : ""),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      hpField: "",
    },
  });

  const onSubmit = async (values: LeadInput) => {
    setStatus("loading");
    setMessage("");

    const payload: LeadInput = {
      ...values,
      sourceUrl,
    };

    const response = await fetch("/api/marketing/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(data?.message || "Nao foi possivel enviar seu contato.");
      return;
    }

    setStatus("success");
    setMessage(data?.message || "Recebido com sucesso.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("hpField")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-semibold">Nome</span>
          <input
            {...register("name")}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--brand)]"
            placeholder="Seu nome"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-semibold">WhatsApp</span>
          <input
            {...register("phone")}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--brand)]"
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-sm font-semibold">E-mail</span>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--brand)]"
            placeholder="voce@empresa.com"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </label>

        <label className="space-y-1.5">
          <span className="text-sm font-semibold">Empresa (opcional)</span>
          <input
            {...register("company")}
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--brand)]"
            placeholder="Nome da oficina"
          />
          {errors.company && <p className="text-xs text-red-600">{errors.company.message}</p>}
        </label>
      </div>

      <label className="space-y-1.5">
        <span className="text-sm font-semibold">Mensagem (opcional)</span>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 outline-none ring-0 transition focus:border-[var(--brand)]"
          placeholder="Conte rapido sobre o tamanho da sua operacao e seu maior desafio hoje."
        />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3.5 font-bold text-white transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={18} />
            Quero uma demonstracao
          </>
        )}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
          <CircleCheck size={16} />
          {message}
        </p>
      )}
      {status === "error" && <p className="text-sm font-semibold text-red-700">{message}</p>}
    </form>
  );
}

