"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Play, CheckCircle, AlertCircle } from "lucide-react";

interface ImportStatus {
  url: string;
  status: "pending" | "loading" | "success" | "error";
  error?: string;
  titulo?: string;
}

export default function ImportacaoLote() {
  const [urlsInput, setUrlsInput] = useState("");
  const [items, setItems] = useState<ImportStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  function prepareImport() {
    const lines = urlsInput.split("\n").map(l => l.trim()).filter(l => l.startsWith("http"));
    if (lines.length === 0) return alert("Cole URLs válidas (uma por linha)");
    
    setItems(lines.map(url => ({ url, status: "pending" })));
  }

  async function startImport() {
    setIsProcessing(true);
    const updatedItems = [...items];

    for (let i = 0; i < updatedItems.length; i++) {
      updatedItems[i].status = "loading";
      setItems([...updatedItems]);

      try {
        // 1. Scrape
        const res = await fetch(`/api/scraper?url=${encodeURIComponent(updatedItems[i].url)}`);
        if (!res.ok) throw new Error("Falha no scraper");
        const data = await res.json();

        // 2. Save to Firestore
        const { addKit } = await import("@/lib/firestoreHelpers");
        await addKit({
          titulo: data.titulo || "Produto Importado",
          preco: data.preco || "R$ 99,90",
          imagem_url: data.imagem_url || "",
          especificacoes: data.especificacoes || [],
          link_afiliado: updatedItems[i].url,
          loja: updatedItems[i].url.includes("amazon") || updatedItems[i].url.includes("amzn.to") || updatedItems[i].url.includes("amazon.com.br")
            ? "Amazon" 
            : updatedItems[i].url.includes("shopee") || updatedItems[i].url.includes("shope.ee")
            ? "Shopee" 
            : "Mercado Livre",
          categoria: "Importados", // Categoria padrão
          nota_estrelas: 4.5,
          qtd_avaliacoes: Math.floor(Math.random() * 1000),
          destaque: false
        });

        updatedItems[i].status = "success";
        updatedItems[i].titulo = data.titulo;
      } catch (err: any) {
        updatedItems[i].status = "error";
        updatedItems[i].error = err.message;
      }
      setItems([...updatedItems]);
    }
    setIsProcessing(false);
  }

  return (
    <div className="admin-container">
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/admin/kits" className="btn-secondary" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Importação em Lote</h1>
      </div>

      <div className="admin-card">
        <label className="form-label">Cole as URLs dos produtos (uma por linha):</label>
        <textarea
          className="form-input"
          style={{ minHeight: "150px", fontFamily: "monospace", fontSize: "0.85rem" }}
          placeholder="https://www.amazon.com.br/dp/B08XYZ...&#10;https://shopee.com.br/product/..."
          value={urlsInput}
          onChange={(e) => setUrlsInput(e.target.value)}
          disabled={isProcessing}
        />
        <div style={{ marginTop: "1rem" }}>
          <button 
            className="btn-primary" 
            onClick={prepareImport}
            disabled={isProcessing || !urlsInput.trim()}
          >
            Analisar Lista ({urlsInput.split("\n").filter(l => l.trim()).length} links)
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Fila de Processamento</h2>
            {!isProcessing && items.some(i => i.status === "pending") && (
              <button className="btn-primary" onClick={startImport} style={{ background: "var(--success)" }}>
                <Play size={16} /> Iniciar Importação
              </button>
            )}
            {isProcessing && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--orange)", fontWeight: 600 }}>
                <Loader2 className="animate-spin" size={18} /> Processando...
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {items.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem", 
                  borderRadius: "8px", background: "rgba(0,0,0,0.02)", border: "1px solid var(--border)" 
                }}
              >
                {item.status === "pending" && <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid var(--border)" }} />}
                {item.status === "loading" && <Loader2 className="animate-spin" size={20} color="var(--orange)" />}
                {item.status === "success" && <CheckCircle size={20} color="var(--success)" />}
                {item.status === "error" && <AlertCircle size={20} color="#ef4444" />}
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.titulo || item.url}
                  </div>
                  {item.error && <div style={{ fontSize: "0.75rem", color: "#ef4444" }}>{item.error}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
