"use client";

import { useState, useEffect, useCallback } from "react";
import { Lead, CHANNELS, STATUSES, EXPERIENCES, SATISFACTIONS } from "@/lib/types";

function getInitials(name: string) {
  return name
    .replace(/[^A-Za-zÀ-ÿ\s]/g, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function feedbackProgress(lead: Lead) {
  const f = lead.feedback;
  if (!f) return 0;
  let filled = 0;
  const total = 9;
  if (f.q1) filled++;
  if (f.q2) filled++;
  if (f.q3) filled++;
  if (f.experience) filled++;
  if (f.q5) filled++;
  if (f.q6) filled++;
  if (f.q7) filled++;
  if (f.q8) filled++;
  if (f.q9) filled++;
  return Math.round((filled / total) * 100);
}

const channelStyle: Record<string, { color: string; bg: string }> = {
  WhatsApp: { color: "#22c55e", bg: "rgba(34,197,94,.08)" },
  LinkedIn: { color: "#3b82f6", bg: "rgba(59,130,246,.08)" },
  Instagram: { color: "#ec4899", bg: "rgba(236,72,153,.08)" },
  Discord: { color: "#8b5cf6", bg: "rgba(139,92,246,.08)" },
  "Formulário": { color: "#f59e0b", bg: "rgba(245,158,11,.08)" },
};

const statusDotColor: Record<string, string> = {
  Pendente: "#64748b",
  Contatado: "#f59e0b",
  Respondeu: "#06b6d4",
  Testou: "#22c55e",
  "Feedback completo": "#a855f7",
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterCh, setFilterCh] = useState("all");
  const [filterSt, setFilterSt] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLead(null);
        setShowNewModal(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = leads.filter((l) => {
    if (filterCh !== "all" && l.channel !== filterCh) return false;
    if (filterSt !== "all" && l.feedback?.status !== filterSt) return false;
    if (search) {
      const s = (l.name + l.group + l.contact + l.channel).toLowerCase();
      if (!s.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const countByChannel = (ch: string) =>
    ch === "all" ? leads.length : leads.filter((l) => l.channel === ch).length;

  const countByStatus = (st: string) =>
    st === "all" ? leads.length : leads.filter((l) => l.feedback?.status === st).length;

  const countReplied = leads.filter((l) => l.feedback?.replied).length;
  const avgNps = (() => {
    const npsValues = leads
      .map((l) => l.feedback?.nps)
      .filter((n): n is number => n !== null && n !== undefined);
    return npsValues.length ? (npsValues.reduce((a, b) => a + b, 0) / npsValues.length).toFixed(1) : "—";
  })();

  const saveFeedback = async (leadId: number, data: Record<string, unknown>) => {
    await fetch(`/api/leads/${leadId}/feedback`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await fetchLeads();
    setSelectedLead(null);
  };

  const toggleReply = async (lead: Lead, replied: boolean) => {
    const f = lead.feedback;
    await fetch(`/api/leads/${lead.id}/feedback`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...f,
        replied,
        status: replied && f?.status === "Pendente" ? "Respondeu" : f?.status,
      }),
    });
    await fetchLeads();
  };

  const createLead = async (data: Record<string, string>) => {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await fetchLeads();
    setShowNewModal(false);
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    await fetchLeads();
    setSelectedLead(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#06080c", color: "#64748b" }}>
        Carregando...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#06080c" }}>
      {/* HEADER */}
      <header
        className="sticky top-0 z-50"
        style={{
          padding: "28px 28px 20px",
          borderBottom: "1px solid #21293a",
          background: "linear-gradient(180deg,#0a0f16,#06080c)",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>
            🎯 Funil de Feedbacks — <span style={{ color: "#06b6d4" }}>LUMYF Beta</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewModal(true)}
              className="flex items-center gap-1.5"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "#06b6d4",
                color: "#000",
                border: "1px solid #06b6d4",
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ➕ Novo Lead
            </button>
            <a
              href="/api/leads/export"
              className="flex items-center gap-1.5"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid #21293a",
                background: "#151b24",
                color: "#e2e8f0",
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              📥 Exportar CSV
            </a>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="flex gap-2 overflow-x-auto" style={{ padding: "16px 28px", borderBottom: "1px solid #21293a" }}>
        {[
          { label: "Total", value: leads.length, color: "#06b6d4", filter: "all" },
          ...CHANNELS.map((ch) => ({
            label: ch,
            value: countByChannel(ch),
            color: channelStyle[ch]?.color || "#06b6d4",
            filter: ch,
          })),
          { label: `Responderam (${leads.length ? Math.round((countReplied / leads.length) * 100) : 0}%)`, value: countReplied, color: "#22c55e", filter: null },
          { label: `NPS Médio`, value: avgNps, color: "#f59e0b", filter: null },
        ].map((st) => (
          <div
            key={st.label}
            onClick={() => st.filter !== null && setFilterCh(st.filter)}
            className="flex-shrink-0"
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: `1px solid ${filterCh === st.filter ? "#06b6d4" : "#21293a"}`,
              background: filterCh === st.filter ? "rgba(6,182,212,.08)" : "#0d1117",
              cursor: st.filter !== null ? "pointer" : "default",
              minWidth: 100,
              transition: "all .15s",
            }}
          >
            <div style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 22, fontWeight: 700, color: st.color }}>
              {st.value}
            </div>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "1.2px", marginTop: 2 }}>
              {st.label}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex gap-1.5 flex-wrap items-center" style={{ padding: "14px 28px", borderBottom: "1px solid #21293a" }}>
        <div className="flex gap-1.5 flex-wrap">
          {["all", ...CHANNELS].map((ch) => (
            <button
              key={ch}
              onClick={() => setFilterCh(ch)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${filterCh === ch ? "#06b6d4" : "#21293a"}`,
                background: filterCh === ch ? "#06b6d4" : "transparent",
                color: filterCh === ch ? "#000" : "#64748b",
                fontFamily: "Outfit,sans-serif",
                fontSize: 12,
                fontWeight: filterCh === ch ? 600 : 400,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {ch !== "all" && (
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    marginRight: 5,
                    background: channelStyle[ch]?.color,
                  }}
                />
              )}
              {ch === "all" ? "Todos" : ch}
            </button>
          ))}
        </div>
        <div style={{ width: 1, height: 24, background: "#21293a", margin: "0 6px", flexShrink: 0 }} />
        <div className="flex gap-1.5 flex-wrap">
          {["all", ...STATUSES].map((st) => (
            <button
              key={st}
              onClick={() => setFilterSt(st)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${filterSt === st ? "#2d3a4f" : "#21293a"}`,
                background: filterSt === st ? "#1c2431" : "transparent",
                color: filterSt === st ? "#e2e8f0" : "#64748b",
                fontFamily: "Outfit,sans-serif",
                fontSize: 12,
                fontWeight: filterSt === st ? 500 : 400,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {st === "all" ? "Todos status" : `${st} (${countByStatus(st)})`}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="🔍 Buscar nome, grupo, contato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginLeft: "auto",
            padding: "7px 14px",
            borderRadius: 20,
            border: "1px solid #21293a",
            background: "#0d1117",
            color: "#e2e8f0",
            fontFamily: "Outfit,sans-serif",
            fontSize: 12,
            outline: "none",
            width: 200,
          }}
        />
      </div>

      {/* TABLE */}
      <div style={{ overflowX: "auto", padding: "0 28px 80px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 13 }}>
          <thead>
            <tr>
              {["Nome", "Canal", "Grupo", "Contato", "Link", "Status", "Respondeu", "Experiência", "NPS", "Progresso"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#0d1117",
                      padding: "10px 12px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      borderBottom: "1px solid #21293a",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
                  <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🔍</span>
                  Nenhum contato encontrado com esses filtros.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => {
                const f = lead.feedback;
                const cs = channelStyle[lead.channel] || { color: "#06b6d4", bg: "rgba(6,182,212,.08)" };
                const prog = feedbackProgress(lead);
                const progColor =
                  prog === 0 ? "#64748b" : prog < 50 ? "#f59e0b" : prog < 100 ? "#06b6d4" : "#22c55e";

                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    style={{ borderBottom: "1px solid #21293a", cursor: "pointer", transition: "background .1s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#151b24")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            background: cs.bg,
                            color: cs.color,
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(lead.name)}
                        </div>
                        <span
                          style={{
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 140,
                          }}
                        >
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 10,
                          fontSize: 10,
                          fontWeight: 600,
                          background: cs.bg,
                          color: cs.color,
                        }}
                      >
                        {lead.channel}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#64748b",
                          background: "rgba(255,255,255,.03)",
                          padding: "2px 6px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {lead.group}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono,monospace",
                          fontSize: 11,
                          color: "#94a3b8",
                          maxWidth: 140,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                        }}
                      >
                        {lead.contact}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <a
                        href={lead.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "1px solid #21293a",
                          background: "transparent",
                          color: "#06b6d4",
                          fontSize: 11,
                          fontFamily: "Outfit,sans-serif",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          transition: "all .15s",
                        }}
                      >
                        Abrir →
                      </a>
                    </td>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          marginRight: 5,
                          background: statusDotColor[f?.status || "Pendente"],
                        }}
                      />
                      {f?.status || "Pendente"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <input
                        type="checkbox"
                        checked={f?.replied || false}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleReply(lead, e.target.checked);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 16, height: 16, accentColor: "#06b6d4", cursor: "pointer" }}
                      />
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8" }}>
                      {f?.experience || "—"}
                    </td>
                    <td style={{ padding: "10px 12px", fontFamily: "JetBrains Mono,monospace", fontSize: 12 }}>
                      {f?.nps ?? "—"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div
                        style={{
                          height: 4,
                          background: "#1c2431",
                          borderRadius: 2,
                          overflow: "hidden",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 2,
                            width: `${prog}%`,
                            background: progColor,
                            transition: "width .3s",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 10, color: "#64748b" }}>{prog}%</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* FEEDBACK MODAL */}
      {selectedLead && (
        <FeedbackModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={saveFeedback}
          onDelete={deleteLead}
        />
      )}

      {/* NEW LEAD MODAL */}
      {showNewModal && (
        <NewLeadModal onClose={() => setShowNewModal(false)} onCreate={createLead} />
      )}
    </div>
  );
}

function FeedbackModal({
  lead,
  onClose,
  onSave,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (id: number, data: Record<string, unknown>) => void;
  onDelete: (id: number) => void;
}) {
  const f = lead.feedback;
  const [form, setForm] = useState({
    status: f?.status || "Pendente",
    nps: f?.nps?.toString() || "",
    experience: f?.experience || "",
    satisfaction: f?.satisfaction || "",
    q1: f?.q1 || "",
    q2: f?.q2 || "",
    q3: f?.q3 || "",
    q5: f?.q5 || "",
    q6: f?.q6 || "",
    q7: f?.q7 || "",
    q8: f?.q8 || "",
    q9: f?.q9 || "",
    notes: f?.notes || "",
  });

  const set = (key: string, val: string) => setForm((prev) => ({ ...prev, [key]: val }));

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #21293a",
    background: "#151b24",
    color: "#e2e8f0",
    fontFamily: "Outfit,sans-serif",
    fontSize: 13,
    outline: "none",
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        zIndex: 200,
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        overflowY: "auto",
      }}
    >
      <div
        className="animate-slideUp"
        style={{
          background: "#0d1117",
          border: "1px solid #21293a",
          borderRadius: 14,
          width: "100%",
          maxWidth: 680,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #21293a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>{lead.name}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24, maxHeight: "70vh", overflowY: "auto" }}>
          <div
            className="flex gap-3 flex-wrap"
            style={{
              marginBottom: 20,
              padding: 14,
              background: "#151b24",
              borderRadius: 10,
              border: "1px solid #21293a",
            }}
          >
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              <strong style={{ color: "#e2e8f0" }}>Canal:</strong> {lead.channel}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              <strong style={{ color: "#e2e8f0" }}>Grupo:</strong> {lead.group}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              <strong style={{ color: "#e2e8f0" }}>Contato:</strong> {lead.contact}
            </div>
            <a
              href={lead.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid #21293a",
                color: "#06b6d4",
                fontSize: 11,
                textDecoration: "none",
              }}
            >
              Abrir conversa →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3.5" style={{ marginBottom: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                Status do Funil
              </label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                NPS (0-10)
              </label>
              <input type="number" min={0} max={10} value={form.nps} onChange={(e) => set("nps", e.target.value)} placeholder="0-10" style={inputStyle} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5" style={{ marginBottom: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                Experiência Geral
              </label>
              <select value={form.experience} onChange={(e) => set("experience", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Selecione...</option>
                {EXPERIENCES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                Satisfação
              </label>
              <select value={form.satisfaction} onChange={(e) => set("satisfaction", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="">Selecione...</option>
                {SATISFACTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          {[
            { key: "q1", label: "1. Por que quis testar?", sub: "Motivação", placeholder: "O que levou essa pessoa a querer testar o Lumyf..." },
            { key: "q2", label: "2. Maior problema de gestão financeira", sub: "Dor principal", placeholder: "Qual o maior problema que ela enfrenta com gestão financeira..." },
            { key: "q3", label: "3. Como acha que o Lumyf pode ajudar?", sub: "", placeholder: "Expectativa sobre como o Lumyf resolve o problema..." },
            { key: "q5", label: "5. O que mais gostou?", sub: "", placeholder: "Pontos positivos que destacou..." },
            { key: "q6", label: "6. O que NÃO gostou?", sub: "", placeholder: "Pontos negativos, frustrações..." },
            { key: "q7", label: "7. Encontrou algum erro/bug? 🐛", sub: "", placeholder: "Descreva o erro, em que tela, o que estava fazendo..." },
            { key: "q8", label: "8. O que mudaria?", sub: "", placeholder: "Sugestões de mudança em funcionalidades existentes..." },
            { key: "q9", label: "9. O que implementaria?", sub: "", placeholder: "Sugestões de novas funcionalidades..." },
            { key: "notes", label: "Observações", sub: "", placeholder: "Anotações livres..." },
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                {field.label}{" "}
                {field.sub && <small style={{ fontWeight: 400, color: "#64748b", textTransform: "none", letterSpacing: 0 }}>{field.sub}</small>}
              </label>
              <textarea
                value={form[field.key as keyof typeof form]}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={{ ...inputStyle, resize: "vertical", minHeight: 70 }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #21293a",
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <button
            onClick={() => onDelete(lead.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ef4444",
              background: "transparent",
              color: "#ef4444",
              fontFamily: "Outfit,sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            🗑️ Excluir Lead
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid #21293a",
                background: "#151b24",
                color: "#e2e8f0",
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(lead.id, form)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "#06b6d4",
                color: "#000",
                border: "1px solid #06b6d4",
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              💾 Salvar Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewLeadModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (data: Record<string, string>) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    channel: "WhatsApp",
    group: "",
    contact: "",
    link: "",
  });

  const set = (key: string, val: string) => setForm((prev) => ({ ...prev, [key]: val }));

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #21293a",
    background: "#151b24",
    color: "#e2e8f0",
    fontFamily: "Outfit,sans-serif",
    fontSize: 13,
    outline: "none",
  };

  const handleSubmit = () => {
    if (!form.name || !form.channel || !form.group || !form.contact || !form.link) {
      alert("Preencha todos os campos!");
      return;
    }
    onCreate(form);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        zIndex: 200,
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        overflowY: "auto",
      }}
    >
      <div
        className="animate-slideUp"
        style={{
          background: "#0d1117",
          border: "1px solid #21293a",
          borderRadius: 14,
          width: "100%",
          maxWidth: 520,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #21293a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>➕ Novo Lead</h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer", padding: 4 }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {[
            { key: "name", label: "Nome", placeholder: "Nome completo do lead" },
            { key: "group", label: "Grupo / Origem", placeholder: "Ex: Codecon Ladies, LinkedIn Íris..." },
            { key: "contact", label: "Contato", placeholder: "Telefone, email ou username" },
            { key: "link", label: "Link", placeholder: "https://wa.me/... ou URL de perfil" },
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
                {field.label}
              </label>
              <input
                value={form[field.key as keyof typeof form]}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={inputStyle}
              />
            </div>
          ))}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94a3b8", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" }}>
              Canal
            </label>
            <select value={form.channel} onChange={(e) => set("channel", e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {CHANNELS.map((ch) => (
                <option key={ch}>{ch}</option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #21293a",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #21293a",
              background: "#151b24",
              color: "#e2e8f0",
              fontFamily: "Outfit,sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "#06b6d4",
              color: "#000",
              border: "1px solid #06b6d4",
              fontFamily: "Outfit,sans-serif",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ➕ Adicionar Lead
          </button>
        </div>
      </div>
    </div>
  );
}
