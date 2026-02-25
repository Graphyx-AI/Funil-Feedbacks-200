import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leads = await prisma.lead.findMany({
    include: { feedback: true },
    orderBy: { id: "asc" },
  });

  const headers = [
    "Nome","Canal","Grupo","Contato","Link","Status","Respondeu",
    "Experiência","NPS","Satisfação","1.Por que quis testar",
    "2.Maior problema","3.Como Lumyf ajuda","5.O que gostou",
    "6.O que não gostou","7.Bugs","8.O que mudaria",
    "9.O que implementaria","Observações",
  ];

  const rows = leads.map((l) => {
    const f = l.feedback;
    return [
      l.name, l.channel, l.group, l.contact, l.link,
      f?.status || "Pendente", f?.replied ? "Sim" : "Não",
      f?.experience || "", f?.nps?.toString() || "", f?.satisfaction || "",
      f?.q1 || "", f?.q2 || "", f?.q3 || "", f?.q5 || "",
      f?.q6 || "", f?.q7 || "", f?.q8 || "", f?.q9 || "",
      f?.notes || "",
    ].map((v) => `"${v.replace(/"/g, '""')}"`).join(",");
  });

  const csv = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=feedbacks_lumyf_beta.csv",
    },
  });
}
