"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Kit } from "@/lib/seedData";

export default function AdminKitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadKits() {
    try {
      const { getKits } = await import("@/lib/firestoreHelpers");
      const data = await getKits();
      setKits(data);
    } catch {
      showToast("Erro ao carregar kits.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadKits(); }, []);

  async function handleDelete(id: string, titulo: string) {
    if (!confirm(`Excluir "${titulo}"?`)) return;
    try {
      const { deleteKit } = await import("@/lib/firestoreHelpers");
      await deleteKit(id);
      showToast("Kit excluído com sucesso.");
      loadKits();
    } catch {
      showToast("Erro ao excluir.", "error");
    }
  }

  function badgeStyle(loja: string) {
    if (loja === "Amazon") return { background: "#FF9900", color: "white" };
    if (loja === "Shopee") return { background: "#EE4D2D", color: "white" };
    return { background: "#FFE600", color: "#333" };
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Gerenciar Kits</h1>
        <Link href="/admin/kits/novo" className="btn-primary">
          <Plus size={16} /> Novo Kit
        </Link>
      </div>

      <div className="admin-card" style={{ padding: "0", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>Carregando...</div>
        ) : kits.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>Nenhum kit cadastrado ainda.</p>
            <Link href="/admin/kits/novo" className="btn-primary" style={{ marginTop: "1rem" }}>
              <Plus size={16} /> Cadastrar Primeiro Kit
            </Link>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Loja</th>
                <th>Preço</th>
                <th>Nota</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {kits.map((k) => (
                <tr key={k.id}>
                  <td style={{ fontWeight: 500, maxWidth: "280px" }}>
                    <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {k.titulo}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{k.categoria}</td>
                  <td>
                    <span style={{ ...badgeStyle(k.loja), padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700 }}>
                      {k.loja}
                    </span>
                  </td>
                  <td style={{ color: "var(--orange)", fontWeight: 700 }}>{k.preco}</td>
                  <td>⭐ {k.nota_estrelas}</td>
                  <td>
                    <div className="gap-actions">
                      <a href={k.link_afiliado} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: "0.3rem 0.5rem" }}>
                        <ExternalLink size={13} />
                      </a>
                      <Link href={`/admin/kits/editar/${k.id}`} className="btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}>
                        <Pencil size={13} />
                      </Link>
                      <button className="btn-danger" onClick={() => k.id && handleDelete(k.id, k.titulo)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
