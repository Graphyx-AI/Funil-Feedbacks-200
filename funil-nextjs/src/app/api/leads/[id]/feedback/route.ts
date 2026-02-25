import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);
  const body = await req.json();

  const feedback = await prisma.feedback.upsert({
    where: { leadId },
    update: {
      status: body.status,
      replied: body.replied ?? (body.status !== "Pendente"),
      nps: body.nps ? parseInt(body.nps) : null,
      experience: body.experience || null,
      satisfaction: body.satisfaction || null,
      q1: body.q1 || null,
      q2: body.q2 || null,
      q3: body.q3 || null,
      q5: body.q5 || null,
      q6: body.q6 || null,
      q7: body.q7 || null,
      q8: body.q8 || null,
      q9: body.q9 || null,
      notes: body.notes || null,
    },
    create: {
      leadId,
      status: body.status || "Pendente",
      replied: body.replied ?? false,
      nps: body.nps ? parseInt(body.nps) : null,
      experience: body.experience || null,
      satisfaction: body.satisfaction || null,
      q1: body.q1 || null,
      q2: body.q2 || null,
      q3: body.q3 || null,
      q5: body.q5 || null,
      q6: body.q6 || null,
      q7: body.q7 || null,
      q8: body.q8 || null,
      q9: body.q9 || null,
      notes: body.notes || null,
    },
  });

  return NextResponse.json(feedback);
}
