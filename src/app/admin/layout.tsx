"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, LogOut, ChevronRight, Download } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    (async () => {
      try {
        const { auth } = await import("@/lib/firebase");
        const { onAuthStateChanged, signOut } = await import("firebase/auth");
        unsubscribe = onAuthStateChanged(auth, (user) => {
          const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
          if (user) {
            // Se houver um e-mail de admin configurado, valide
            if (adminEmail && user.email !== adminEmail) {
              signOut(auth).then(() => router.replace("/admin"));
              return;
            }
            setUserEmail(user.email);
          } else if (pathname !== "/admin") {
            router.replace("/admin");
          }
          setChecking(false);
        });
      } catch {
        setChecking(false);
      }
    })();
    return () => { if (unsubscribe) unsubscribe(); };
  }, [pathname, router]);

  async function handleLogout() {
    const { auth } = await import("@/lib/firebase");
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    router.replace("/admin");
  }

  // Don't wrap the login page itself
  if (pathname === "/admin") return <>{children}</>;
  if (checking) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Verificando acesso...</div>
    </div>
  );

  const navLinks = [
    { href: "/admin/dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
    { href: "/admin/kits", icon: <Package size={16} />, label: "Kits" },
    { href: "/admin/kits/importar", icon: <Download size={16} />, label: "Importação em Lote" },
    { href: "/admin/categorias", icon: <Tag size={16} />, label: "Categorias" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">⚙️ Só Kits Admin</div>

        {navLinks.map((nl) => (
          <Link
            key={nl.href}
            href={nl.href}
            className={`admin-nav-link ${pathname === nl.href ? "active" : ""}`}
          >
            {nl.icon} {nl.label}
            {pathname === nl.href && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
          </Link>
        ))}

        <div style={{ marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {userEmail && (
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", padding: "0 0.5rem", marginBottom: "0.75rem", wordBreak: "break-word" }}>
              {userEmail}
            </p>
          )}
          <Link href="/" className="admin-nav-link" style={{ fontSize: "0.8rem" }}>
            ← Ver loja
          </Link>
          <button
            onClick={handleLogout}
            className="admin-nav-link"
            style={{ background: "none", border: "none", width: "100%", cursor: "pointer", font: "inherit", color: "rgba(255,255,255,0.65)" }}
          >
            <LogOut size={15} /> Sair
          </button>
        </div>
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
