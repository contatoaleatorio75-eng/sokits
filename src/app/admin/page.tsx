"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { auth } = await import("@/lib/firebase");
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError("Credenciais inválidas. Verifique e-mail e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image
            src="/logo.png"
            alt="Só Kits Admin"
            width={130}
            height={42}
            style={{ objectFit: "contain", height: "42px", width: "auto", margin: "0 auto 1rem" }}
          />
          <h1 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--navy)", margin: 0 }}>
            Área Administrativa
          </h1>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            Acesso restrito aos gestores da Só Kits
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">E-mail</label>
            <input
              id="admin-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@sokits.com.br"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Senha</label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPass ? "text" : "password"}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{ paddingRight: "2.5rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: "#fee2e2", color: "#dc2626", padding: "0.6rem 0.9rem",
              borderRadius: "8px", fontSize: "0.82rem", marginBottom: "1rem"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}
          >
            <LogIn size={16} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1.5rem" }}>
          Precisa de acesso?{" "}
          <a href="mailto:admin@sokits.com.br" style={{ color: "var(--orange)" }}>
            Entre em contato
          </a>
        </p>
      </div>
    </div>
  );
}
