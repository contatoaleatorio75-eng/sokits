// lib/seedData.ts
// Dados iniciais dos 15 produtos para seed no Firestore

export interface Kit {
  id?: string;
  titulo: string;
  categoria: string;
  categoria_id?: string;
  preco: string;
  especificacoes: string[];
  link_afiliado: string;
  loja: string;
  imagem_url: string;
  nota_estrelas: number;
  qtd_avaliacoes: number;
  destaque?: boolean;
}

export interface Categoria {
  id?: string;
  nome: string;
  emoji: string;
  slug: string;
  ordem: number;
}

export const categoriasSeed: Omit<Categoria, "id">[] = [
  { nome: "Oficina em Casa", emoji: "🛠️", slug: "oficina-em-casa", ordem: 1 },
  { nome: "Praticidade Doméstica", emoji: "🏠", slug: "praticidade-domestica", ordem: 2 },
  { nome: "Cuidado Automotivo", emoji: "🚗", slug: "cuidado-automotivo", ordem: 3 },
  { nome: "Tecnologia & Office", emoji: "💻", slug: "tecnologia-office", ordem: 4 },
  { nome: "Casa Inteligente", emoji: "💡", slug: "casa-inteligente", ordem: 5 },
];

const placeholderImg = (cat: string) => {
  const terms: Record<string, string> = {
    "Potes+Herméticos": "food-containers",
    "Limpeza+Automotiva": "car-wash",
    "Teclado+Mouse": "keyboard-mouse",
    "Casa+Inteligente": "smart-home",
    "Ferramentas+Bosch": "power-tools",
    "Utensílios+Silicone": "kitchen-utensils",
    "Escovas+Rotativas": "drill-brushes",
    "Organizador+Fios": "cable-management",
    "Sensores+Movimento": "motion-sensor",
    "Maleta+Ferramentas": "toolbox",
    "Mop+Giratório": "mop-cleaning",
    "Pincéis+Automotivo": "car-detailing",
    "Kit+Ferramentas+PC": "pc-repair-kit",
    "Sensores+Fotocélula": "outdoor-lighting",
    "Soquetes+Catraca": "socket-wrench",
  };
  const query = terms[cat] || "product";
  return `https://images.unsplash.com/photo-${
    {
      "food-containers": "1584346133934-a3afd2a33c4c",
      "car-wash": "1607860108855-64acf2078ed9",
      "keyboard-mouse": "1527866959252-deab27ef0d19",
      "smart-home": "1558002038-1055907df827",
      "power-tools": "1572981779307-38b8cabb2407",
      "kitchen-utensils": "1556910103-1c02745aae4d",
      "drill-brushes": "1581244277943-fe4a9c777189",
      "cable-management": "1585829365295-ab7cd400c167",
      "motion-sensor": "1618343169382-74892c90c767",
      "toolbox": "1586864387917-af70c7fe9e73",
      "mop-cleaning": "1584622650-1859e015ef05",
      "car-detailing": "1598970434722-5c43444c59b3",
      "pc-repair-kit": "1591799272175-862d0ff30d52",
      "outdoor-lighting": "1599939571622-f284f17f400b",
      "socket-wrench": "1530124395684-0662fe9f803c",
    }[query] || "1523275335684-114c44b7a2a1"
  }?auto=format&fit=crop&q=80&w=800`;
};

export const kitsSeed: Omit<Kit, "id">[] = [
  {
    titulo: "Kit Potes Herméticos Electrolux 10 Peças",
    categoria: "Praticidade Doméstica",
    preco: "R$ 99,90",
    especificacoes: ["Fechamento hermético", "Livre de BPA", "Vai ao micro-ondas e freezer"],
    link_afiliado: "https://amzn.to/4cng8Hk",
    loja: "Amazon",
    imagem_url: placeholderImg("Potes+Herméticos"),
    nota_estrelas: 4.8,
    qtd_avaliacoes: 1243,
    destaque: true,
  },
  {
    titulo: "Kit Limpeza Automotiva Vonixx V-Floc + Sintra",
    categoria: "Cuidado Automotivo",
    preco: "R$ 99,90",
    especificacoes: ["Shampoo super concentrado", "Limpador flotador interno", "PH neutro"],
    link_afiliado: "https://amzn.to/48fbMQd",
    loja: "Amazon",
    imagem_url: placeholderImg("Limpeza+Automotiva"),
    nota_estrelas: 4.7,
    qtd_avaliacoes: 892,
    destaque: true,
  },
  {
    titulo: "Kit Teclado e Mouse Sem Fio Logitech MK220",
    categoria: "Tecnologia & Office",
    preco: "R$ 99,90",
    especificacoes: ["Conexão wireless 2.4GHz", "Design compacto", "Pilhas inclusas"],
    link_afiliado: "https://amzn.to/4vH2jLv",
    loja: "Amazon",
    imagem_url: placeholderImg("Teclado+Mouse"),
    nota_estrelas: 4.9,
    qtd_avaliacoes: 3412,
    destaque: true,
  },
  {
    titulo: "Kit Casa Inteligente Positivo Lâmpada + Tomada",
    categoria: "Casa Inteligente",
    preco: "R$ 99,90",
    especificacoes: ["Compatível com Alexa/Google", "Lâmpada RGB 12W", "Controle de consumo"],
    link_afiliado: "https://amzn.to/41LIJA6",
    loja: "Amazon",
    imagem_url: placeholderImg("Casa+Inteligente"),
    nota_estrelas: 4.6,
    qtd_avaliacoes: 654,
  },
  {
    titulo: "Jogo de Ferramentas Bosch X-Line 34 Peças",
    categoria: "Oficina em Casa",
    preco: "R$ 99,90",
    especificacoes: ["Brocas multimatéria", "Bits variados", "Maleta compacta"],
    link_afiliado: "https://amzn.to/4tst9FE",
    loja: "Amazon",
    imagem_url: placeholderImg("Ferramentas+Bosch"),
    nota_estrelas: 4.8,
    qtd_avaliacoes: 2187,
    destaque: true,
  },
  {
    titulo: "Kit 12 Utensílios de Cozinha em Silicone",
    categoria: "Praticidade Doméstica",
    preco: "R$ 99,90",
    especificacoes: ["Silicone atóxico", "Resiste a altas temperaturas", "Suporte incluso"],
    link_afiliado: "https://s.shopee.com.br/W2tMBA92D",
    loja: "Shopee",
    imagem_url: placeholderImg("Utensílios+Silicone"),
    nota_estrelas: 4.7,
    qtd_avaliacoes: 5621,
  },
  {
    titulo: "Kit 3 Escovas Rotativas para Furadeira",
    categoria: "Cuidado Automotivo",
    preco: "R$ 99,90",
    especificacoes: ["Encaixe universal 1/4", "Cerdas de nylon médias", "Limpa estofados"],
    link_afiliado: "https://s.shopee.com.br/2g7NwCDfXt",
    loja: "Shopee",
    imagem_url: placeholderImg("Escovas+Rotativas"),
    nota_estrelas: 4.5,
    qtd_avaliacoes: 1876,
  },
  {
    titulo: "Kit Organizador de Fios Adesivo 60 Unidades",
    categoria: "Tecnologia & Office",
    preco: "R$ 99,90",
    especificacoes: ["Acrílico transparente", "Fita dupla face", "Discreto e prático"],
    link_afiliado: "https://s.shopee.com.br/5AoiupH5p3",
    loja: "Shopee",
    imagem_url: placeholderImg("Organizador+Fios"),
    nota_estrelas: 4.6,
    qtd_avaliacoes: 3291,
  },
  {
    titulo: "Kit 4 Sensores de Movimento Soquete E27",
    categoria: "Casa Inteligente",
    preco: "R$ 99,90",
    especificacoes: ["Bivolt", "Timer de desligamento", "Sem necessidade de obras"],
    link_afiliado: "https://s.shopee.com.br/5q4Pi4uyms",
    loja: "Shopee",
    imagem_url: placeholderImg("Sensores+Movimento"),
    nota_estrelas: 4.7,
    qtd_avaliacoes: 2104,
  },
  {
    titulo: "Maleta Kit Ferramentas Profissional 178 Peças",
    categoria: "Oficina em Casa",
    preco: "R$ 99,90",
    especificacoes: ["Soquetes e catracas", "Chaves combinadas", "Maleta resistente"],
    link_afiliado: "https://s.shopee.com.br/2g7NwHYCKw",
    loja: "Shopee",
    imagem_url: placeholderImg("Maleta+Ferramentas"),
    nota_estrelas: 4.8,
    qtd_avaliacoes: 4532,
    destaque: true,
  },
  {
    titulo: "Kit Mop Giratório Fit Flash Limp com Refil",
    categoria: "Praticidade Doméstica",
    preco: "R$ 99,90",
    especificacoes: ["Balde com centrífuga", "Cabo telescópico", "Refil em microfibra"],
    link_afiliado: "https://meli.la/2WMEJvX",
    loja: "Mercado Livre",
    imagem_url: placeholderImg("Mop+Giratório"),
    nota_estrelas: 4.9,
    qtd_avaliacoes: 8743,
  },
  {
    titulo: "Kit Pincéis de Detalhamento Automotivo 5 Peças",
    categoria: "Cuidado Automotivo",
    preco: "R$ 99,90",
    especificacoes: ["Cerdas sintéticas macias", "Não risca painéis", "Limpeza de cantos"],
    link_afiliado: "https://meli.la/2NvX6in",
    loja: "Mercado Livre",
    imagem_url: placeholderImg("Pincéis+Automotivo"),
    nota_estrelas: 4.6,
    qtd_avaliacoes: 987,
  },
  {
    titulo: "Kit Ferramentas Celular PC 115 em 1",
    categoria: "Tecnologia & Office",
    preco: "R$ 99,90",
    especificacoes: ["Bits magnéticos", "Pinças antiestáticas", "Estojo organizador"],
    link_afiliado: "https://meli.la/1kW5sfW",
    loja: "Mercado Livre",
    imagem_url: placeholderImg("Kit+Ferramentas+PC"),
    nota_estrelas: 4.8,
    qtd_avaliacoes: 2341,
  },
  {
    titulo: "Kit 2 Sensores de Presença Fotocélula E27",
    categoria: "Casa Inteligente",
    preco: "R$ 99,90",
    especificacoes: ["Acende no escuro", "Alcance 6 metros", "Compatível com LED"],
    link_afiliado: "https://meli.la/2RNMX3w",
    loja: "Mercado Livre",
    imagem_url: placeholderImg("Sensores+Fotocélula"),
    nota_estrelas: 4.5,
    qtd_avaliacoes: 1654,
  },
  {
    titulo: "Jogo de Soquetes Sextavados 1/4 Catraca 46 Pçs",
    categoria: "Oficina em Casa",
    preco: "R$ 99,90",
    especificacoes: ["Aço cromo-vanádio", "Catraca reversível", "Extensões flexíveis"],
    link_afiliado: "https://meli.la/1Fz7Dtp",
    loja: "Mercado Livre",
    imagem_url: placeholderImg("Soquetes+Catraca"),
    nota_estrelas: 4.7,
    qtd_avaliacoes: 3098,
  },
];
