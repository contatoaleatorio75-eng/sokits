import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Só Kits",
  description: "Saiba como a Só Kits coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <h1 style={{ fontFamily: "Outfit", fontSize: "2rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
          Política de Privacidade
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: "2rem" }}>
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        {[
          { title: "1. Quem Somos", content: "A Só Kits (lojasokits.com.br) é um portal de curadoria independente de produtos. Não vendemos produtos diretamente — somos um portal de afiliados que conecta consumidores às melhores ofertas da Amazon, Shopee e Mercado Livre." },
          { title: "2. Dados Coletados", content: "Nosso site não coleta dados pessoais identificáveis diretamente. Podemos coletar dados anônimos de navegação através de ferramentas de análise (como Google Analytics) para melhorar a experiência do usuário." },
          { title: "3. Cookies", content: "Utilizamos cookies técnicos necessários para o funcionamento do site e cookies de análise anônimos. Ao continuar navegando, você concorda com o uso desses cookies." },
          { title: "4. Links de Afiliados", content: "Este site contém links de afiliados. Ao clicar nesses links e realizar uma compra, podemos receber uma comissão sem custo adicional para você. Os preços e condições são definidos pelas lojas parceiras." },
          { title: "5. Seus Direitos", content: "Você pode solicitar informações sobre seus dados a qualquer momento. Entre em contato conosco pelo e-mail contato@lojasokits.com.br para exercer seus direitos garantidos pela LGPD (Lei 13.709/2018)." },
          { title: "6. Alterações nesta Política", content: "Reservamo-nos o direito de atualizar esta política periodicamente. Recomendamos que a revise regularmente." },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.5rem", fontFamily: "Outfit" }}>
              {section.title}
            </h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem" }}>{section.content}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
