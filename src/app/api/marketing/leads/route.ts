import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { leadSchema } from "@/lib/validation/lead";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: "Muitas tentativas. Tente novamente em alguns minutos." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Dados invalidos.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    if (parsed.data.hpField) {
      return NextResponse.json({ ok: true, message: "Recebido." }, { status: 200 });
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("marketing_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company || null,
      message: parsed.data.message || null,
      source_url: parsed.data.sourceUrl || null,
      product_interest: "autoeletrica-pro",
      source: "landing-page",
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: "Nao foi possivel salvar o lead.", error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { ok: true, message: "Recebemos seu contato. Vamos falar com voce em breve." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Erro interno ao processar sua solicitacao.",
        error: error instanceof Error ? error.message : "unknown_error",
      },
      { status: 500 },
    );
  }
}

