"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Zap, Package, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import { kitsSeed, categoriasSeed, type Kit, type Categoria } from "@/lib/seedData";

// Firebase & helpers (loaded lazily to avoid SSG issues)
async function loadKitsFromFirebase(): Promise<{ kits: Kit[]; cats: Categoria[] } | null> {
  try {
    const { db } = await import("@/lib/firebase");
    const { getCategorias, getKits, runSeedIfNeeded } = await import("@/lib/firestoreHelpers");
    await runSeedIfNeeded();
    const [cats, kits] = await Promise.all([getCategorias(), getKits()]);
    return { kits, cats };
  } catch {
    return null;
  }
}

const CATS_STATIC: Categoria[] = categoriasSeed.map((c, i) => ({ ...c, id: c.slug }));

export default function HomePage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>(CATS_STATIC);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    // Load data: try Firebase first, fallback to seed data
    loadKitsFromFirebase().then((result) => {
      if (result && result.kits.length > 0) {
        setKits(result.kits);
        setCategorias(result.cats);
        setFirebaseReady(true);
      } else {
        // Firebase not configured — use seed data directly
        const staticKits: Kit[] = kitsSeed.map((k, i) => ({
          ...k,
          id: `static-${i}`,
          categoria_id: categoriasSeed.find((c) => c.nome === k.categoria)?.slug || "",
        }));
        setKits(staticKits);
      }
      setLoading(false);
    });

    // Read ?cat= from URL
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat");
    if (cat) setActiveCat(cat);
  }, []);

  const handleCatFilter = useCallback((slug: string | null) => {
    setActiveCat(slug);
    setSearchQuery("");
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    setActiveCat(null);
  }, []);

  const filteredKits = useMemo(() => {
    let result = kits;
    if (activeCat) {
      result = result.filter(
        (k) =>
          k.categoria_id === activeCat ||
          categorias.find((c) => c.slug === activeCat)?.nome === k.categoria
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (k) =>
          k.titulo.toLowerCase().includes(q) ||
          k.categoria.toLowerCase().includes(q) ||
          k.especificacoes.some((e) => e.toLowerCase().includes(q))
      );
    }
    return result;
  }, [kits, activeCat, searchQuery, categorias]);

  // Count per category
  const contagens = useMemo(() => {
    const map: Record<string, number> = {};
    categorias.forEach((c) => {
      map[c.slug] = kits.filter(
        (k) => k.categoria_id === c.slug || k.categoria === c.nome
      ).length;
    });
    return map;
  }, [kits, categorias]);

  const destaques = useMemo(() => kits.filter((k) => k.destaque), [kits]);

  return (
    <>
      <Header
        onSearch={handleSearch}
        onCatFilter={handleCatFilter}
        activeSlug={activeCat}
      />

      <div className="page-wrapper">
        {/* Sidebar */}
        <Sidebar
          categorias={categorias}
          activeSlug={activeCat}
          contagens={contagens}
          onSelect={handleCatFilter}
        />

        {/* Main content */}
        <main>
          {/* Hero — shown only when no filter active */}
          {!activeCat && !searchQuery && (
            <section className="hero" aria-label="Bem-vindo à Só Kits">
              <div className="hero-content">
                <div className="hero-text">
                  <div className="hero-badge">
                    <Zap size={12} /> Curadoria Especializada
                  </div>
                  <h1>
                    Bem-vindo à <span>Só Kits</span>:<br />
                    Sua vida facilitada em um clique.
                  </h1>
                  <p>
                    Cansado de perder horas procurando itens individuais? Na Só Kits, nós fazemos o trabalho
                    pesado por você. Reunimos os melhores conjuntos e{" "}
                    <em>bundles</em> do mercado em um só lugar.
                  </p>
                  <div className="hero-stats">
                    <div className="hero-stat">
                      <strong>{kits.length}+</strong>
                      <span>Kits curados</span>
                    </div>
                    <div className="hero-stat">
                      <strong>3</strong>
                      <span>Lojas parceiras</span>
                    </div>
                    <div className="hero-stat">
                      <strong>5</strong>
                      <span>Categorias</span>
                    </div>
                  </div>
                </div>
                <div className="hero-visual">
                  <img src="/hero_bundles_visual_1777073627581.png" alt="Produtos Curados" className="floating-img" />
                </div>
              </div>
            </section>
          )}

          {/* Destaques — shown only on home */}
          {!activeCat && !searchQuery && destaques.length > 0 && (
            <section aria-label="Kits em Destaque" style={{ marginBottom: "2rem" }}>
              <div className="section-header">
                <h2 className="section-title">
                  <Star size={16} style={{ color: "var(--orange)" }} /> Kits em Destaque
                </h2>
              </div>
              <div className="products-grid">
                {destaques.map((kit) => (
                  <ProductCard key={kit.id || kit.titulo} kit={kit} />
                ))}
              </div>
            </section>
          )}

          {/* All kits / filtered results */}
          <section aria-label="Catálogo de Kits">
            <div className="section-header">
              <h2 className="section-title">
                <Package size={16} style={{ color: "var(--orange)" }} />
                {activeCat
                  ? categorias.find((c) => c.slug === activeCat)?.nome || activeCat
                  : searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : "Todos os Kits"}
              </h2>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                {filteredKits.length} produto{filteredKits.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Filter pills (loja) */}
            {!loading && (
              <div className="filter-bar" role="group" aria-label="Filtrar por loja">
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginRight: "0.25rem" }}>
                  Loja:
                </span>
                {["Todos", "Amazon", "Shopee", "Mercado Livre"].map((loja) => {
                  const isAll = loja === "Todos";
                  const count = isAll
                    ? filteredKits.length
                    : filteredKits.filter((k) => k.loja === loja).length;
                  return (
                    <button
                      key={loja}
                      className="filter-pill"
                      onClick={() => {
                        /* loja filter would go here — future improvement */
                      }}
                      style={{ opacity: count === 0 ? 0.4 : 1 }}
                    >
                      {loja} {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>
            )}

            {loading ? (
              <div className="products-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <div className="skeleton" style={{ height: "190px" }} />
                    <div style={{ padding: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div className="skeleton" style={{ height: "14px", width: "60%" }} />
                      <div className="skeleton" style={{ height: "18px", width: "90%" }} />
                      <div className="skeleton" style={{ height: "14px", width: "75%" }} />
                      <div className="skeleton" style={{ height: "28px", width: "40%" }} />
                      <div className="skeleton" style={{ height: "40px", borderRadius: "8px" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredKits.length === 0 ? (
              <div
                style={{
                  textAlign: "center", padding: "4rem 2rem",
                  background: "white", borderRadius: "12px",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "3rem" }}>🔍</div>
                <h3 style={{ color: "var(--navy)", margin: "1rem 0 0.5rem" }}>Nenhum kit encontrado</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Tente outra busca ou selecione uma categoria diferente.
                </p>
                <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setActiveCat(null); setSearchQuery(""); }}>
                  Ver todos os kits
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredKits.map((kit) => (
                  <ProductCard key={kit.id || kit.titulo} kit={kit} />
                ))}
              </div>
            )}
          </section>

          {!firebaseReady && !loading && (
            <div
              style={{
                marginTop: "2rem", padding: "1rem 1.25rem",
                background: "rgba(255,107,0,0.06)", border: "1px dashed rgba(255,107,0,0.3)",
                borderRadius: "10px", fontSize: "0.82rem", color: "var(--text-muted)",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}
            >
              ⚠️ <strong>Modo demonstração:</strong> Configure o Firebase no arquivo{" "}
              <code style={{ background: "#f0f0f0", padding: "0 4px", borderRadius: "4px" }}>.env.local</code>{" "}
              para salvar dados permanentemente. Os produtos abaixo são dados de demonstração.
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
