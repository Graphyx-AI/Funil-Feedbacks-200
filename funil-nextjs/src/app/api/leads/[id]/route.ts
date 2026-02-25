import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leadId = parseInt(id);

  await prisma.feedback.deleteMany({ where: { leadId } });
  await prisma.lead.delete({ where: { id: leadId } });

  return NextResponse.json({ ok: true });
}
