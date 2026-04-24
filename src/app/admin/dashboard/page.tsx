"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Tag, TrendingUp, ExternalLink } from "lucide-react";
import type { Kit } from "@/lib/seedData";

export default function AdminDashboard() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { getKits } = await import("@/lib/firestoreHelpers");
        const data = await getKits();
        setKits(data);
      } catch {
        // Firebase not configured
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byLoja = {
    Amazon: kits.filter((k) => k.loja === "Amazon").length,
    Shopee: kits.filter((k) => k.loja === "Shopee").length,
    "Mercado Livre": kits.filter((k) => k.loja === "Mercado Livre").length,
  };

  const recent = [...kits].reverse().slice(0, 5);

  return (
    <>
      <h1 className="admin-page-title">Dashboard</h1>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total de Kits", value: kits.length, icon: <Package size={20} />, color: "var(--orange)" },
          { label: "Amazon", value: byLoja.Amazon, icon: "📦", color: "#FF9900" },
          { label: "Shopee", value: byLoja.Shopee, icon: "🛍️", color: "#EE4D2D" },
          { label: "Mercado Livre", value: byLoja["Mercado Livre"], icon: "🏪", color: "#FFE600" },
        ].map((stat) => (
          <div key={stat.label} className="admin-card" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.25rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: stat.color, fontFamily: "Outfit" }}>
              {loading ? "—" : stat.value}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="admin-card">
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
          <TrendingUp size={16} style={{ display: "inline", marginRight: "0.5rem" }} />
          Ações Rápidas
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/admin/kits/novo" className="btn-primary">+ Novo Kit</Link>
          <Link href="/admin/kits" className="btn-secondary"><Package size={15} /> Ver Todos os Kits</Link>
          <Link href="/admin/categorias" className="btn-secondary"><Tag size={15} /> Gerenciar Categorias</Link>
          <Link href="/" className="btn-secondary" target="_blank"><ExternalLink size={14} /> Ver Loja</Link>
          <button
            className="btn-danger"
            style={{ fontSize: "0.75rem", background: "none", color: "#dc2626", border: "1px solid #fca5a5" }}
            onClick={async () => {
              if (confirm("Isso apagará todos os kits atuais e recarregará as imagens de alta qualidade do Seed. Continuar?")) {
                const { forceResetSeed } = await import("@/lib/firestoreHelpers");
                await forceResetSeed();
                window.location.reload();
              }
            }}
          >
            Redefinir Banco (Imagens HQ)
          </button>
        </div>
      </div>

      {/* Recent kits */}
      {recent.length > 0 && (
        <div className="admin-card">
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
            Kits Recentes
          </h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Loja</th>
                <th>Preço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((k) => (
                <tr key={k.id}>
                  <td style={{ fontWeight: 500 }}>{k.titulo}</td>
                  <td><span style={{ fontSize: "0.78rem" }}>{k.categoria}</span></td>
                  <td><span style={{ fontSize: "0.78rem" }}>{k.loja}</span></td>
                  <td style={{ color: "var(--orange)", fontWeight: 600 }}>{k.preco}</td>
                  <td>
                    <Link href={`/admin/kits/editar/${k.id}`} className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}>
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
