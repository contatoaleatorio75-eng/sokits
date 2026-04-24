"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Image
            src="/logo.png"
            alt="Só Kits"
            width={110}
            height={36}
            style={{ objectFit: "contain", height: "36px", width: "auto", filter: "brightness(0) invert(1)" }}
          />
          <p>
            Curadoria independente dos melhores kits e conjuntos da Amazon,
            Shopee e Mercado Livre. Economize tempo com nossa seleção especializada.
          </p>
        </div>

        <div className="footer-col">
          <h4>Categorias</h4>
          <Link href="/?cat=oficina-em-casa">🛠️ Oficina em Casa</Link>
          <Link href="/?cat=praticidade-domestica">🏠 Praticidade Doméstica</Link>
          <Link href="/?cat=cuidado-automotivo">🚗 Cuidado Automotivo</Link>
          <Link href="/?cat=tecnologia-office">💻 Tecnologia & Office</Link>
          <Link href="/?cat=casa-inteligente">💡 Casa Inteligente</Link>
        </div>

        <div className="footer-col">
          <h4>Parceiros</h4>
          <a href="https://amazon.com.br" target="_blank" rel="noopener noreferrer">Amazon Brasil</a>
          <a href="https://shopee.com.br" target="_blank" rel="noopener noreferrer">Shopee</a>
          <a href="https://mercadolivre.com.br" target="_blank" rel="noopener noreferrer">Mercado Livre</a>
        </div>

        <div className="footer-col">
          <h4>Institucional</h4>
          <Link href="/privacidade">Política de Privacidade</Link>
          <Link href="/termos">Termos de Uso</Link>
          <Link href="/sobre">Sobre a Só Kits</Link>
          <Link href="/contato">Contato</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-disclaimer">
          <strong style={{ color: "rgba(255,255,255,0.6)" }}>Aviso Legal:</strong> A Só Kits é um portal de curadoria independente.
          Participamos de programas de afiliados da Amazon, Mercado Livre e Shopee. Isso significa que, ao clicar em
          alguns links e realizar uma compra, podemos receber uma pequena comissão, sem nenhum custo adicional para você.
          Os preços e a disponibilidade dos produtos são de responsabilidade das lojas parceiras.
        </p>
        <div className="footer-links">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Só Kits
          </span>
        </div>
      </div>
    </footer>
  );
}
