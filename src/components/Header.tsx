"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const categorias = [
  { emoji: "💻", nome: "Tecnologia & Office", slug: "tecnologia-office" },
  { emoji: "💡", nome: "Casa Inteligente", slug: "casa-inteligente" },
  { emoji: "🛠️", nome: "Oficina em Casa", slug: "oficina-em-casa" },
  { emoji: "🏠", nome: "Praticidade Doméstica", slug: "praticidade-domestica" },
  { emoji: "🚗", nome: "Cuidado Automotivo", slug: "cuidado-automotivo" },
  { emoji: "📱", nome: "Celulares", slug: "celulares" },
];

interface HeaderProps {
  onSearch?: (q: string) => void;
  onCatFilter?: (slug: string | null) => void;
  activeSlug?: string | null;
}

export default function Header({ onCatFilter, activeSlug }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="site-header">
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
            width={180}
            height={56}
            priority
            style={{ objectFit: "contain", height: "56px", width: "auto" }}
          />
        </Link>

        {/* Inline Category Nav */}
        <nav className={`header-nav-inline ${mobileNavOpen ? "open" : ""}`}>
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
        </nav>

        {/* Search removed from header to give more space to categories */}
      </div>
    </header>
  );
}
