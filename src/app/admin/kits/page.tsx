import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Search, ChevronUp, ChevronDown } from "lucide-react";
import type { Kit } from "@/lib/seedData";

export default function AdminKitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  
  // Sorting & Filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Kit | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);

  function toggleSelect(id: string) {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === kits.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(kits.map(k => k.id || ""));
    }
  }

  async function handleBulkDelete() {
    if (!selectedIds.length) return;
    if (!confirm(`Deseja excluir os ${selectedIds.length} kits selecionados?`)) return;
    
    setIsDeletingBulk(true);
    try {
      const { deleteKit } = await import("@/lib/firestoreHelpers");
      for (const id of selectedIds) {
        await deleteKit(id);
      }
      showToast(`${selectedIds.length} kits excluídos com sucesso.`);
      setSelectedIds([]);
      loadKits();
    } catch {
      showToast("Erro ao excluir alguns itens.", "error");
    } finally {
      setIsDeletingBulk(false);
    }
  }

  const filteredAndSortedKits = useMemo(() => {
    let result = [...kits];

    // Filter
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      result = result.filter(k => 
        k.titulo.toLowerCase().includes(s) || 
        k.categoria.toLowerCase().includes(s) || 
        k.loja.toLowerCase().includes(s)
      );
    }

    // Sort
    if (sortField) {
      result.sort((a, b) => {
        let valA: any = a[sortField] || "";
        let valB: any = b[sortField] || "";

        if (sortField === "preco") {
          const parseP = (val: string) => parseFloat(val.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
          valA = parseP(String(valA));
          valB = parseP(String(valB));
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [kits, searchTerm, sortField, sortOrder]);

  function handleSort(field: keyof Kit) {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  function SortIcon({ field }: { field: keyof Kit }) {
    if (sortField !== field) return <ChevronUp size={14} className="sort-icon" />;
    return sortOrder === "asc" ? <ChevronUp size={14} className="sort-icon" /> : <ChevronDown size={14} className="sort-icon" />;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <div className="search-container-admin" style={{ marginBottom: 0 }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            className="search-input-admin" 
            placeholder="Filtrar por título, categoria ou loja..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {selectedIds.length > 0 && (
            <button 
              className="btn-danger" 
              onClick={handleBulkDelete} 
              disabled={isDeletingBulk}
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
            >
              <Trash2 size={14} /> {isDeletingBulk ? "Excluindo..." : `Excluir (${selectedIds.length})`}
            </button>
          )}
          <Link href="/admin/kits/novo" className="btn-primary">
            <Plus size={16} /> Novo Kit
          </Link>
        </div>
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
        ) : filteredAndSortedKits.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>Nenhum kit encontrado para "{searchTerm}".</p>
            <button className="btn-secondary" onClick={() => setSearchTerm("")} style={{ marginTop: "1rem" }}>
              Limpar Busca
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === kits.length && kits.length > 0} 
                    onChange={toggleSelectAll}
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                  />
                </th>
                <th onClick={() => handleSort("titulo")} className={`sortable-header ${sortField === "titulo" ? "active" : ""}`}>
                  Título <SortIcon field="titulo" />
                </th>
                <th onClick={() => handleSort("categoria")} className={`sortable-header ${sortField === "categoria" ? "active" : ""}`}>
                  Categoria <SortIcon field="categoria" />
                </th>
                <th onClick={() => handleSort("loja")} className={`sortable-header ${sortField === "loja" ? "active" : ""}`}>
                  Loja <SortIcon field="loja" />
                </th>
                <th onClick={() => handleSort("preco")} className={`sortable-header ${sortField === "preco" ? "active" : ""}`}>
                  Preço <SortIcon field="preco" />
                </th>
                <th onClick={() => handleSort("nota_estrelas")} className={`sortable-header ${sortField === "nota_estrelas" ? "active" : ""}`}>
                  Nota <SortIcon field="nota_estrelas" />
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedKits.map((k) => (
                <tr key={k.id} style={{ background: selectedIds.includes(k.id || "") ? "rgba(255, 153, 0, 0.05)" : "transparent" }}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(k.id || "")} 
                      onChange={() => k.id && toggleSelect(k.id)}
                      style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    />
                  </td>
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
