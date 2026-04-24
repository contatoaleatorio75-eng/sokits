"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Wand2, Plus, Minus, Save, ArrowLeft, Loader2 } from "lucide-react";
import type { Kit, Categoria } from "@/lib/seedData";
import { categoriasSeed } from "@/lib/seedData";

interface KitFormProps {
  initialData?: Partial<Kit>;
  kitId?: string;
}

const STATIC_CATS: Categoria[] = categoriasSeed.map((c) => ({ ...c, id: c.slug }));

export default function KitForm({ initialData, kitId }: KitFormProps) {
  const router = useRouter();
  const isEditing = !!kitId;

  const [categorias, setCategorias] = useState<Categoria[]>(STATIC_CATS);
  const [scraperUrl, setScraperUrl] = useState("");
  const [scraperLoading, setScraperLoading] = useState(false);
  const [scraperError, setScraperError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState<Omit<Kit, "id">>({
    titulo: "",
    categoria: "",
    categoria_id: "",
    preco: "",
    especificacoes: ["", "", ""],
    link_afiliado: "",
    loja: "Amazon",
    imagem_url: "",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 100,
    destaque: false,
    ...initialData,
  });

  useEffect(() => {
    (async () => {
      try {
        const { getCategorias } = await import("@/lib/firestoreHelpers");
        const cats = await getCategorias();
        if (cats.length) setCategorias(cats);
      } catch {}
    })();
  }, []);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setSpec(i: number, val: string) {
    const specs = [...form.especificacoes];
    specs[i] = val;
    setField("especificacoes", specs);
  }

  function addSpec() { setField("especificacoes", [...form.especificacoes, ""]); }
  function removeSpec(i: number) {
    if (form.especificacoes.length <= 1) return;
    setField("especificacoes", form.especificacoes.filter((_, idx) => idx !== i));
  }

  const handleScrape = useCallback(async () => {
    if (!scraperUrl.trim()) return;
    setScraperLoading(true);
    setScraperError("");
    try {
      const isStatic = window.location.hostname !== 'localhost' && !window.location.hostname.includes('vercel.app');
      
      const res = await fetch(`/api/scraper?url=${encodeURIComponent(scraperUrl)}`);
      if (!res.ok) {
        if (res.status === 404 || isStatic) {
          throw new Error("O Scraper requer um servidor backend (Vercel/Netlify). Em hospedagens estáticas (GitHub Pages), esta função está desativada.");
        }
        throw new Error("Falha ao acessar o serviço de extração.");
      }
      
      const data = await res.json();
      if (data.titulo) setField("titulo", data.titulo);
      if (data.preco) setField("preco", data.preco);
      if (data.imagem_url) setField("imagem_url", data.imagem_url);
      if (data.especificacoes?.length) setField("especificacoes", data.especificacoes.slice(0, 5));
      // Detect loja from URL
      if (scraperUrl.includes("amazon") || scraperUrl.includes("amzn")) setField("loja", "Amazon");
      else if (scraperUrl.includes("shopee") || scraperUrl.includes("shope.ee")) setField("loja", "Shopee");
      else if (scraperUrl.includes("mercadolivre") || scraperUrl.includes("meli")) setField("loja", "Mercado Livre");
      showToast("Dados extraídos com sucesso!");
    } catch (err: any) {
      setScraperError(err.message || "Não foi possível extrair dados. Preencha manualmente.");
    } finally {
      setScraperLoading(false);
    }
  }, [scraperUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { addKit, updateKit } = await import("@/lib/firestoreHelpers");
      const payload = {
        ...form,
        especificacoes: form.especificacoes.filter((s) => s.trim()),
      };
      if (isEditing && kitId) {
        await updateKit(kitId, payload);
        showToast("Kit atualizado com sucesso!");
      } else {
        await addKit(payload);
        showToast("Kit salvo com sucesso!");
      }
      setTimeout(() => router.push("/admin/kits"), 1500);
    } catch {
      showToast("Erro ao salvar. Verifique o Firebase.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <button onClick={() => router.back()} className="btn-secondary" style={{ padding: "0.4rem 0.75rem" }}>
          <ArrowLeft size={15} />
        </button>
        <h1 className="admin-page-title" style={{ margin: 0 }}>
          {isEditing ? "Editar Kit" : "Novo Kit"}
        </h1>
      </div>

      {/* ── Scraper box ── */}
      <div className="scraper-box">
        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--orange)", marginBottom: "0.75rem" }}>
          🤖 Puxar Dados Automaticamente
        </p>
        <div className="scraper-row">
          <input
            id="scraper-url"
            type="url"
            className="form-input"
            placeholder="Cole a URL pública do produto (Amazon, Shopee, Mercado Livre)..."
            value={scraperUrl}
            onChange={(e) => setScraperUrl(e.target.value)}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={handleScrape}
            disabled={scraperLoading || !scraperUrl.trim()}
          >
            {scraperLoading ? <Loader2 size={15} className="spin" /> : <Wand2 size={15} />}
            {scraperLoading ? "Buscando..." : "Puxar Dados"}
          </button>
        </div>
        {scraperError && (
          <p style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "0.4rem" }}>{scraperError}</p>
        )}
        <p className="form-hint" style={{ marginTop: "0.4rem" }}>
          ⚡ Preenche título, imagem, preço e specs automaticamente. Depois, insira seu <strong>link de afiliado</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.25rem" }}>
            Informações do Kit
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label" htmlFor="kit-titulo">Título *</label>
              <input id="kit-titulo" className="form-input" value={form.titulo} onChange={(e) => setField("titulo", e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kit-categoria">Categoria *</label>
              <select
                id="kit-categoria"
                className="form-input"
                value={form.categoria}
                onChange={(e) => {
                  const cat = categorias.find((c) => c.nome === e.target.value);
                  setField("categoria", e.target.value);
                  setField("categoria_id", cat?.slug || cat?.id || "");
                }}
                required
              >
                <option value="">Selecione...</option>
                {categorias.map((c) => (
                  <option key={c.id || c.slug} value={c.nome}>{c.emoji} {c.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kit-loja">Loja *</label>
              <select id="kit-loja" className="form-input" value={form.loja} onChange={(e) => setField("loja", e.target.value as any)}>
                <option>Amazon</option>
                <option>Shopee</option>
                <option>Mercado Livre</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kit-preco">Preço</label>
              <input id="kit-preco" className="form-input" value={form.preco} onChange={(e) => setField("preco", e.target.value)} placeholder="R$ 99,90" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kit-nota">Nota (estrelas)</label>
              <input id="kit-nota" type="number" min="1" max="5" step="0.1" className="form-input" value={form.nota_estrelas} onChange={(e) => setField("nota_estrelas", parseFloat(e.target.value))} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="kit-avaliacoes">Qtd. Avaliações</label>
              <input id="kit-avaliacoes" type="number" min="0" className="form-input" value={form.qtd_avaliacoes} onChange={(e) => setField("qtd_avaliacoes", parseInt(e.target.value))} />
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label" htmlFor="kit-afiliado">Link de Afiliado *</label>
              <input id="kit-afiliado" type="url" className="form-input" value={form.link_afiliado} onChange={(e) => setField("link_afiliado", e.target.value)} placeholder="https://amzn.to/..." required />
              <p className="form-hint">⚠️ Use <strong>seu</strong> link de afiliado aqui, não a URL pública acima.</p>
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label" htmlFor="kit-imagem">URL da Imagem</label>
              <input id="kit-imagem" type="url" className="form-input" value={form.imagem_url} onChange={(e) => setField("imagem_url", e.target.value)} placeholder="https://..." />
              {form.imagem_url && (
                <img src={form.imagem_url} alt="Preview" style={{ marginTop: "0.5rem", height: "80px", objectFit: "contain", borderRadius: "6px", border: "1px solid var(--border)" }} />
              )}
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                id="kit-destaque"
                type="checkbox"
                checked={!!form.destaque}
                onChange={(e) => setField("destaque", e.target.checked)}
                style={{ width: "16px", height: "16px", accentColor: "var(--orange)" }}
              />
              <label className="form-label" htmlFor="kit-destaque" style={{ margin: 0, cursor: "pointer" }}>
                ⭐ Marcar como Destaque na Home
              </label>
            </div>
          </div>
        </div>

        {/* Especificações */}
        <div className="admin-card">
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>
            Especificações (bullet points)
          </h2>
          {form.especificacoes.map((spec, i) => (
            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                className="form-input"
                value={spec}
                onChange={(e) => setSpec(i, e.target.value)}
                placeholder={`Especificação ${i + 1}...`}
              />
              <button type="button" onClick={() => removeSpec(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <Minus size={16} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addSpec} className="btn-secondary" style={{ marginTop: "0.25rem", fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}>
            <Plus size={14} /> Adicionar
          </button>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button type="button" onClick={() => router.back()} className="btn-secondary">Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? <Loader2 size={15} /> : <Save size={15} />}
            {saving ? "Salvando..." : isEditing ? "Salvar Alterações" : "Publicar Kit"}
          </button>
        </div>
      </form>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
