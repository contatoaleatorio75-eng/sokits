import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a Só Kits | Curadoria de Kits e Conjuntos",
  description: "Conheça a história e a missão da Só Kits: facilitar sua vida reunindo os melhores kits do mercado.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg, var(--navy) 0%, #254d8c 100%)",
            borderRadius: "16px",
            padding: "3rem 2.5rem",
            color: "white",
            marginBottom: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", margin: "0 0 1rem", color: "white" }}>
              Sobre a <span style={{ color: "var(--orange)" }}>Só Kits</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "600px", margin: 0 }}>
              Nossa missão é simples: economizar o seu tempo. Fazemos a curadoria dos melhores
              kits e conjuntos disponíveis online para que você nunca precise procurar sozinho.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {[
            { emoji: "🎯", title: "Nossa Missão", desc: "Reunir os melhores conjuntos e kits do mercado em um portal organizado e confiável." },
            { emoji: "🤝", title: "Como Ganhamos", desc: "Somos afiliados de Amazon, Shopee e Mercado Livre. Ganhamos comissão quando você compra via nossos links — sem custo extra para você." },
            { emoji: "✅", title: "Nossa Curadoria", desc: "Cada kit é selecionado manualmente com base em avaliações, custo-benefício e relevância para o dia a dia." },
            { emoji: "🚀", title: "Nossa Promessa", desc: "Preços atualizados, links verificados e descrições honestas. Se um produto não presta, não indicamos." },
          ].map((item) => (
            <div key={item.title} style={{ background: "white", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", margin: "0 0 0.4rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Outfit", fontSize: "1.3rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
            Fale Conosco
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1rem" }}>
            Sugestões de kits, parcerias ou dúvidas? Entre em contato!
          </p>
          <a href="mailto:contato@lojasokits.com.br" className="btn-primary" style={{ display: "inline-flex" }}>
            ✉️ contato@lojasokits.com.br
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
