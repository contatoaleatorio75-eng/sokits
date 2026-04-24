"use client";
import type { Categoria } from "@/lib/seedData";

interface SidebarProps {
  categorias: Categoria[];
  activeSlug: string | null;
  contagens?: Record<string, number>;
  onSelect: (slug: string | null) => void;
}

export default function Sidebar({ categorias, activeSlug, contagens = {}, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categorias</div>

      <button
        className={`sidebar-item ${!activeSlug ? "active" : ""}`}
        onClick={() => onSelect(null)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", font: "inherit", cursor: "pointer" }}
      >
        🏷️ Todos os Kits
        <span className="sidebar-count">{Object.values(contagens).reduce((a, b) => a + b, 0) || ""}</span>
      </button>

      {categorias.map((cat) => (
        <button
          key={cat.slug}
          className={`sidebar-item ${activeSlug === cat.slug ? "active" : ""}`}
          onClick={() => onSelect(cat.slug)}
          style={{ width: "100%", textAlign: "left", background: "none", border: "none", font: "inherit", cursor: "pointer" }}
        >
          {cat.emoji} {cat.nome}
          {contagens[cat.slug] !== undefined && (
            <span className="sidebar-count">{contagens[cat.slug]}</span>
          )}
        </button>
      ))}
    </aside>
  );
}
