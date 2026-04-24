"use client";
import type { Kit } from "@/lib/seedData";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  kit: Kit;
}

function renderStars(nota: number) {
  const full = Math.floor(nota);
  const half = nota % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < full; i++) stars.push("★");
  if (half) stars.push("½");
  return stars.join("");
}

function badgeClass(loja: string) {
  if (loja === "Amazon") return "badge-amazon";
  if (loja === "Shopee") return "badge-shopee";
  return "badge-mercado";
}

function lojaLabel(loja: string) {
  if (loja === "Mercado Livre") return "Mercado Livre";
  return loja;
}

export default function ProductCard({ kit }: ProductCardProps) {
  return (
    <article className="product-card fade-in">
      {/* Loja badge */}
      <span className={`card-badge-loja ${badgeClass(kit.loja)}`}>
        {lojaLabel(kit.loja)}
      </span>

      {/* Image */}
      <div className="card-img-wrap">
        <Image
          src={kit.imagem_url || `https://placehold.co/400x300/1B3A6B/FF6B00?text=${encodeURIComponent(kit.titulo.slice(0, 20))}`}
          alt={kit.titulo}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Category badge */}
        <span className="card-cat-badge">{kit.categoria}</span>

        {/* Title */}
        <h3 className="card-title">{kit.titulo}</h3>

        {/* Rating */}
        <div className="card-rating">
          <span className="stars">{renderStars(kit.nota_estrelas)}</span>
          <span className="rating-num">{kit.nota_estrelas.toFixed(1)}</span>
          <span className="rating-count">({kit.qtd_avaliacoes.toLocaleString("pt-BR")})</span>
          <a
            href={kit.link_afiliado}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rating-link"
            onClick={(e) => e.stopPropagation()}
          >
            Ver avaliações
          </a>
        </div>

        {/* Specs */}
        <ul className="card-specs">
          {kit.especificacoes.slice(0, 3).map((spec, i) => (
            <li key={i}>{spec}</li>
          ))}
        </ul>

        {/* Price */}
        <div>
          <div className="card-price-label">a partir de</div>
          <div className="card-price">{kit.preco}</div>
        </div>

        {/* CTA */}
        <a
          href={kit.link_afiliado}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-ver-preco"
          id={`btn-kit-${kit.id || kit.titulo.replace(/\s+/g, "-").toLowerCase()}`}
        >
          VER PREÇO NA LOJA <ExternalLink size={14} style={{ display: "inline", marginLeft: "4px" }} />
        </a>
      </div>
    </article>
  );
}
