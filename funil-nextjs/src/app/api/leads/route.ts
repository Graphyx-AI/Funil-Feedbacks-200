import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const leads = await prisma.lead.findMany({
    where: {
      ...(channel ? { channel } : {}),
      ...(status ? { feedback: { status } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { group: { contains: search } },
              { contact: { contains: search } },
            ],
          }
        : {}),
    },
    include: { feedback: true },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, channel, group, contact, link } = body;

  if (!name || !channel || !group || !contact || !link) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      name,
      channel,
      group,
      contact,
      link,
      feedback: {
        create: { status: "Pendente", replied: false },
      },
    },
    include: { feedback: true },
  });

  return NextResponse.json(lead, { status: 201 });
}
