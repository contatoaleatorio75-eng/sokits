"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ShoppingBag } from "lucide-react";

const categorias = [
  { emoji: "🛠️", nome: "Oficina em Casa", slug: "oficina-em-casa" },
  { emoji: "🏠", nome: "Praticidade Doméstica", slug: "praticidade-domestica" },
  { emoji: "🚗", nome: "Cuidado Automotivo", slug: "cuidado-automotivo" },
  { emoji: "💻", nome: "Tecnologia & Office", slug: "tecnologia-office" },
  { emoji: "💡", nome: "Casa Inteligente", slug: "casa-inteligente" },
];

interface HeaderProps {
  onSearch?: (q: string) => void;
  onCatFilter?: (slug: string | null) => void;
  activeSlug?: string | null;
}

export default function Header({ onSearch, onCatFilter, activeSlug }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(query);
  }

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Menu de categorias"
        >
          {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="header-logo">
          <Image
            src="/logo.png"
            alt="Só Kits"
            width={140}
            height={44}
            priority
            style={{ objectFit: "contain", height: "44px", width: "auto" }}
          />
        </Link>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <input
            type="text"
            placeholder="Buscar kits, conjuntos, ferramentas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar produtos"
          />
          <button type="submit" aria-label="Buscar">
            <Search size={18} />
          </button>
        </form>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/admin"
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", textDecoration: "none",
              padding: "0.4rem 0.75rem", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px", transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >
            <ShoppingBag size={14} /> Admin
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="header-nav">
        <div className={`header-nav-inner ${mobileNavOpen ? "block" : ""}`}>
          <button
            className={`nav-link ${!activeSlug ? "active" : ""}`}
            onClick={() => { onCatFilter?.(null); setMobileNavOpen(false); }}
            style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
          >
            🏷️ Todos os Kits
          </button>
          {categorias.map((c) => (
            <button
              key={c.slug}
              className={`nav-link ${activeSlug === c.slug ? "active" : ""}`}
              onClick={() => { onCatFilter?.(c.slug); setMobileNavOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}
            >
              {c.emoji} {c.nome}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
