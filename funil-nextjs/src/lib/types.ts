export interface Feedback {
  id: number;
  leadId: number;
  status: string;
  replied: boolean;
  nps: number | null;
  experience: string | null;
  satisfaction: string | null;
  q1: string | null;
  q2: string | null;
  q3: string | null;
  q5: string | null;
  q6: string | null;
  q7: string | null;
  q8: string | null;
  q9: string | null;
  notes: string | null;
  updatedAt: string;
}

export interface Lead {
  id: number;
  name: string;
  channel: string;
  group: string;
  contact: string;
  link: string;
  createdAt: string;
  feedback: Feedback | null;
}

export const CHANNELS = ["WhatsApp", "LinkedIn", "Instagram", "Discord", "Formulário"] as const;
export const STATUSES = ["Pendente", "Contatado", "Respondeu", "Testou", "Feedback completo"] as const;

export const CHANNEL_COLORS: Record<string, { color: string; bg: string; cls: string }> = {
  WhatsApp: { color: "text-wa", bg: "bg-wa/10", cls: "wa" },
  LinkedIn: { color: "text-li", bg: "bg-li/10", cls: "li" },
  Instagram: { color: "text-ig", bg: "bg-ig/10", cls: "ig" },
  Discord: { color: "text-dc", bg: "bg-dc/10", cls: "dc" },
  "Formulário": { color: "text-fm", bg: "bg-fm/10", cls: "fm" },
};

export const STATUS_COLORS: Record<string, string> = {
  Pendente: "bg-text3",
  Contatado: "bg-warn",
  Respondeu: "bg-accent",
  Testou: "bg-success",
  "Feedback completo": "bg-purple-500",
};

export const EXPERIENCES = ["Excelente", "Boa", "Regular", "Ruim", "Ainda não testou"];
export const SATISFACTIONS = ["Muito satisfeito", "Satisfeito", "Neutro", "Insatisfeito", "Muito insatisfeito"];
