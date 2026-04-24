"use client";
import { useEffect, useState } from "react";
import KitForm from "@/components/KitForm";
import type { Kit } from "@/lib/seedData";

export default function EditKitClient({ kitId }: { kitId: string }) {
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { getKits } = await import("@/lib/firestoreHelpers");
        const all = await getKits();
        const found = all.find((k) => k.id === kitId);
        setKit(found || null);
      } finally {
        setLoading(false);
      }
    })();
  }, [kitId]);

  if (loading) return <div style={{ padding: "3rem", color: "var(--text-muted)" }}>Carregando kit...</div>;
  if (!kit) return <div style={{ padding: "3rem", color: "#dc2626" }}>Kit não encontrado.</div>;

  return <KitForm initialData={kit} kitId={kitId} />;
}
