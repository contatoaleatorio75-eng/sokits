"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import type { Categoria } from "@/lib/seedData";
import { categoriasSeed } from "@/lib/seedData";

const STATIC_CATS: Categoria[] = categoriasSeed.map((c) => ({ ...c, id: c.slug }));

export default function CategoriasPage() {
  const [cats, setCats] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [adding, setAdding] = useState(false);
  const [newCat, setNewCat] = useState({ nome: "", emoji: "📦", slug: "", ordem: 99 });
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    try {
      const { getCategorias } = await import("@/lib/firestoreHelpers");
      const data = await getCategorias();
      setCats(data.length ? data : STATIC_CATS);
    } catch {
      setCats(STATIC_CATS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newCat.nome.trim()) return;
    try {
      const { addCategoria } = await import("@/lib/firestoreHelpers");
      const slug = newCat.slug || newCat.nome.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      await addCategoria({ ...newCat, slug });
      showToast("Categoria adicionada!");
      setAdding(false);
      setNewCat({ nome: "", emoji: "📦", slug: "", ordem: 99 });
      load();
    } catch { showToast("Erro ao adicionar.", "error"); }
  }

  async function handleUpdate() {
    if (!editing?.id) return;
    try {
      const { updateCategoria } = await import("@/lib/firestoreHelpers");
      await updateCategoria(editing.id, editing);
      showToast("Categoria atualizada!");
      setEditing(null);
      load();
    } catch { showToast("Erro ao atualizar.", "error"); }
  }

  async function handleDelete(id: string, nome: string) {
    if (!confirm(`Excluir categoria "${nome}"?`)) return;
    try {
      const { deleteCategoria } = await import("@/lib/firestoreHelpers");
      await deleteCategoria(id);
      showToast("Categoria excluída.");
      load();
    } catch { showToast("Erro ao excluir.", "error"); }
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Categorias</h1>
        <button className="btn-primary" onClick={() => setAdding(true)}>
          <Plus size={16} /> Nova Categoria
        </button>
      </div>

      {adding && (
        <div className="admin-card" style={{ background: "rgba(255,107,0,0.04)", border: "1.5px dashed rgba(255,107,0,0.3)" }}>
          <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--orange)", marginBottom: "1rem" }}>
            Nova Categoria
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 80px", gap: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Emoji</label>
              <input className="form-input" value={newCat.emoji} onChange={(e) => setNewCat({ ...newCat, emoji: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Nome *</label>
              <input className="form-input" value={newCat.nome} onChange={(e) => setNewCat({ ...newCat, nome: e.target.value })} placeholder="Ex: Jardinagem" />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Slug</label>
              <input className="form-input" value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} placeholder="auto-gerado" />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Ordem</label>
              <input type="number" className="form-input" value={newCat.ordem} onChange={(e) => setNewCat({ ...newCat, ordem: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="gap-actions" style={{ marginTop: "0.75rem" }}>
            <button className="btn-primary" onClick={handleAdd}><Save size={14} /> Salvar</button>
            <button className="btn-secondary" onClick={() => setAdding(false)}><X size={14} /> Cancelar</button>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>Carregando...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Nome</th>
                <th>Slug</th>
                <th>Ordem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((cat) => {
                const isEditing = editing && editing.id === cat.id;
                return (
                  <tr key={cat.id}>
                    {isEditing ? (
                      <>
                        <td><input className="form-input" style={{ width: "60px" }} value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} /></td>
                        <td><input className="form-input" value={editing.nome} onChange={(e) => setEditing({ ...editing, nome: e.target.value })} /></td>
                        <td><input className="form-input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></td>
                        <td><input type="number" className="form-input" style={{ width: "70px" }} value={editing.ordem} onChange={(e) => setEditing({ ...editing, ordem: parseInt(e.target.value) })} /></td>
                        <td>
                          <div className="gap-actions">
                            <button className="btn-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }} onClick={handleUpdate}><Save size={13} /></button>
                            <button className="btn-secondary" style={{ padding: "0.3rem 0.6rem" }} onClick={() => setEditing(null)}><X size={13} /></button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ fontSize: "1.4rem" }}>{cat.emoji}</td>
                        <td style={{ fontWeight: 600 }}>{cat.nome}</td>
                        <td><code style={{ fontSize: "0.75rem", background: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" }}>{cat.slug}</code></td>
                        <td>{cat.ordem}</td>
                        <td>
                          <div className="gap-actions">
                            <button className="btn-secondary" style={{ padding: "0.3rem 0.6rem" }} onClick={() => setEditing(cat)}><Pencil size={13} /></button>
                            {cat.id && !["oficina-em-casa", "praticidade-domestica", "cuidado-automotivo", "tecnologia-office", "casa-inteligente"].includes(cat.id) && (
                              <button className="btn-danger" onClick={() => cat.id && handleDelete(cat.id, cat.nome)}><Trash2 size={13} /></button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
