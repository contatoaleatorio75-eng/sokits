// lib/firestoreHelpers.ts
// Funções CRUD para kits e categorias

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  setDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { kitsSeed, categoriasSeed, type Kit, type Categoria } from "./seedData";

// ─── Categorias ────────────────────────────────────────────────────────────────

export async function getCategorias(): Promise<Categoria[]> {
  const q = query(collection(db, "categorias"), orderBy("ordem"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Categoria));
}

export async function addCategoria(cat: Omit<Categoria, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "categorias"), cat);
  return ref.id;
}

export async function updateCategoria(id: string, cat: Partial<Categoria>): Promise<void> {
  await updateDoc(doc(db, "categorias", id), cat);
}

export async function deleteCategoria(id: string): Promise<void> {
  await deleteDoc(doc(db, "categorias", id));
}

// ─── Kits ──────────────────────────────────────────────────────────────────────

export async function getKits(categoriaId?: string): Promise<Kit[]> {
  let q;
  if (categoriaId) {
    q = query(collection(db, "kits"), where("categoria_id", "==", categoriaId), orderBy("titulo"));
  } else {
    q = query(collection(db, "kits"), orderBy("titulo"));
  }
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Kit));
}

export async function addKit(kit: Omit<Kit, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "kits"), {
    ...kit,
    created_at: Timestamp.now(),
  });
  return ref.id;
}

export async function updateKit(id: string, kit: Partial<Kit>): Promise<void> {
  await updateDoc(doc(db, "kits", id), kit);
}

export async function deleteKit(id: string): Promise<void> {
  await deleteDoc(doc(db, "kits", id));
}

// ─── Seed ─────────────────────────────────────────────────────────────────────

export async function runSeedIfNeeded(): Promise<boolean> {
  // Verifica se já foi feito o seed
  const seedRef = doc(db, "meta", "seed_v1");
  const seedSnap = await getDoc(seedRef);
  if (seedSnap.exists()) return false;

  // Insere categorias
  const catMap: Record<string, string> = {};
  for (const cat of categoriasSeed) {
    const id = await addDoc(collection(db, "categorias"), cat);
    catMap[cat.nome] = id.id;
  }

  // Insere kits com categoria_id referenciado
  for (const kit of kitsSeed) {
    const cat_id = catMap[kit.categoria] || "";
    await addDoc(collection(db, "kits"), {
      ...kit,
      categoria_id: cat_id,
      created_at: Timestamp.now(),
    });
  }

  // Marca seed como feito
  await setDoc(seedRef, { done: true, at: Timestamp.now() });
  return true;
}
export async function forceResetSeed() {
  const kitsCol = collection(db, "kits");
  const catsCol = collection(db, "categorias");
  const metaCol = collection(db, "meta");

  // Deletar kits atuais
  const kitsSnap = await getDocs(kitsCol);
  for (const doc of kitsSnap.docs) await deleteDoc(doc.ref);

  // Deletar categorias atuais
  const catsSnap = await getDocs(catsCol);
  for (const doc of catsSnap.docs) await deleteDoc(doc.ref);

  // Rodar seed
  await setDoc(doc(metaCol, "status"), { seeded: false });
  await runSeedIfNeeded();
}
