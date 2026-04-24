export interface Categoria {
  id: string;
  nome: string;
  emoji: string;
  slug: string;
}

export interface Kit {
  id?: string;
  titulo: string;
  categoria: string;
  categoria_id: string;
  preco: string;
  especificacoes: string[];
  link_afiliado: string;
  loja: "Amazon" | "Shopee" | "Mercado Livre";
  imagem_url: string;
  nota_estrelas: number;
  qtd_avaliacoes: number;
  destaque?: boolean;
}

export const categoriasSeed: Categoria[] = [
  { id: "1", nome: "Oficina em Casa", emoji: "🛠️", slug: "oficina-em-casa" },
  { id: "2", nome: "Praticidade Doméstica", emoji: "🏠", slug: "praticidade-domestica" },
  { id: "3", nome: "Cuidado Automotivo", emoji: "🚗", slug: "cuidado-automotivo" },
  { id: "4", nome: "Tecnologia & Office", emoji: "💻", slug: "tecnologia-office" },
  { id: "5", nome: "Casa Inteligente", emoji: "💡", slug: "casa-inteligente" },
];

export const kitsSeed: Kit[] = [
  // AMAZON
  {
    titulo: "Kit 10 Potes Herméticos Electrolux - Plástico Cinza",
    categoria: "Praticidade Doméstica",
    categoria_id: "praticidade-domestica",
    preco: "R$ 149,90",
    especificacoes: ["Fechamento hermético", "Livre de BPA", "Vai ao micro-ondas e freezer"],
    link_afiliado: "https://amzn.to/4cng8Hk",
    loja: "Amazon",
    imagem_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.9,
    qtd_avaliacoes: 1250,
    destaque: true
  },
  {
    titulo: "Kit Estética Automotiva Completo - Shampoo e Flotador",
    categoria: "Cuidado Automotivo",
    categoria_id: "cuidado-automotivo",
    preco: "R$ 89,90",
    especificacoes: ["Shampoo super concentrado", "Limpador flotador interno", "PH neutro"],
    link_afiliado: "https://amzn.to/48fbMQd",
    loja: "Amazon",
    imagem_url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 850
  },
  {
    titulo: "Combo Teclado e Mouse Wireless Dell Pro",
    categoria: "Tecnologia & Office",
    categoria_id: "tecnologia-office",
    preco: "R$ 199,00",
    especificacoes: ["Conexão wireless 2.4GHz", "Design compacto", "Pilhas inclusas"],
    link_afiliado: "https://amzn.to/4vH2jLv",
    loja: "Amazon",
    imagem_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.7,
    qtd_avaliacoes: 2100,
    destaque: true
  },
  {
    titulo: "Lâmpada Inteligente RGB 12W - Wi-Fi",
    categoria: "Casa Inteligente",
    categoria_id: "casa-inteligente",
    preco: "R$ 54,90",
    especificacoes: ["Compatível com Alexa/Google", "Lâmpada RGB 12W", "Controle de consumo"],
    link_afiliado: "https://amzn.to/41LIJA6",
    loja: "Amazon",
    imagem_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.6,
    qtd_avaliacoes: 3400
  },
  {
    titulo: "Jogo de Brocas e Bits Multimatéria - 35 Peças",
    categoria: "Oficina em Casa",
    categoria_id: "oficina-em-casa",
    preco: "R$ 120,00",
    especificacoes: ["Brocas multimatéria", "Bits variados", "Maleta compacta"],
    link_afiliado: "https://amzn.to/4tst9FE",
    loja: "Amazon",
    imagem_url: "https://images.unsplash.com/photo-1581147036324-c17da42e1d0c?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 1500
  },

  // SHOPEE
  {
    titulo: "Conjunto Utensílios de Cozinha em Silicone - 12 Peças",
    categoria: "Praticidade Doméstica",
    categoria_id: "praticidade-domestica",
    preco: "R$ 75,00",
    especificacoes: ["Silicone atóxico", "Resiste a altas temperaturas", "Suporte incluso"],
    link_afiliado: "https://s.shopee.com.br/W2tMBA92D",
    loja: "Shopee",
    imagem_url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.5,
    qtd_avaliacoes: 5600
  },
  {
    titulo: "Kit Escovas para Furadeira - Limpeza de Estofados",
    categoria: "Cuidado Automotivo",
    categoria_id: "cuidado-automotivo",
    preco: "R$ 32,90",
    especificacoes: ["Encaixe universal 1/4", "Cerdas de nylon médias", "Limpa estofados"],
    link_afiliado: "https://s.shopee.com.br/2g7NwCDfXt",
    loja: "Shopee",
    imagem_url: "https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.7,
    qtd_avaliacoes: 1200
  },
  {
    titulo: "Organizador de Cabos e Fios - Acrílico Transparente",
    categoria: "Tecnologia & Office",
    categoria_id: "tecnologia-office",
    preco: "R$ 15,90",
    especificacoes: ["Acrílico transparente", "Fita dupla face", "Discreto e prático"],
    link_afiliado: "https://s.shopee.com.br/5AoiupH5p3",
    loja: "Shopee",
    imagem_url: "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.4,
    qtd_avaliacoes: 890
  },
  {
    titulo: "Tomada Inteligente Wi-Fi - Automação Residencial",
    categoria: "Casa Inteligente",
    categoria_id: "casa-inteligente",
    preco: "R$ 42,00",
    especificacoes: ["Bivolt", "Timer de desligamento", "Sem necessidade de obras"],
    link_afiliado: "https://s.shopee.com.br/5q4Pi4uyms",
    loja: "Shopee",
    imagem_url: "https://images.unsplash.com/photo-1558002038-103792e097ea?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.6,
    qtd_avaliacoes: 2300
  },
  {
    titulo: "Maleta de Ferramentas - Jogo de Soquetes 46 Peças",
    categoria: "Oficina em Casa",
    categoria_id: "oficina-em-casa",
    preco: "R$ 68,00",
    especificacoes: ["Soquetes e catracas", "Chaves combinadas", "Maleta resistente"],
    link_afiliado: "https://s.shopee.com.br/2g7NwHYCKw",
    loja: "Shopee",
    imagem_url: "https://images.unsplash.com/photo-1586864387917-f74e18d92381?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 4100
  },

  // MERCADO LIVRE
  {
    titulo: "Mop Giratório Limpeza Prática - Com Balde",
    categoria: "Praticidade Doméstica",
    categoria_id: "praticidade-domestica",
    preco: "R$ 85,00",
    especificacoes: ["Balde com centrífuga", "Cabo telescópico", "Refil em microfibra"],
    link_afiliado: "https://meli.la/2WMEJvX",
    loja: "Mercado Livre",
    imagem_url: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.7,
    qtd_avaliacoes: 9500
  },
  {
    titulo: "Kit de Pincéis para Detalhamento Automotivo",
    categoria: "Cuidado Automotivo",
    categoria_id: "cuidado-automotivo",
    preco: "R$ 45,90",
    especificacoes: ["Cerdas sintéticas macias", "Não risca painéis", "Limpeza de cantos"],
    link_afiliado: "https://meli.la/2NvX6in",
    loja: "Mercado Livre",
    imagem_url: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 1800
  },
  {
    titulo: "Kit Chaves de Precisão para Eletrônicos",
    categoria: "Tecnologia & Office",
    categoria_id: "tecnologia-office",
    preco: "R$ 59,00",
    especificacoes: ["Bits magnéticos", "Pinças antiestáticas", "Estojo organizador"],
    link_afiliado: "https://meli.la/1kW5sfW",
    loja: "Mercado Livre",
    imagem_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.9,
    qtd_avaliacoes: 3200
  },
  {
    titulo: "Fita LED Inteligente 5 Metros - Wi-Fi",
    categoria: "Casa Inteligente",
    categoria_id: "casa-inteligente",
    preco: "R$ 78,00",
    especificacoes: ["Acende no escuro", "Alcance 6 metros", "Compatível com LED"],
    link_afiliado: "https://meli.la/2RNMX3w",
    loja: "Mercado Livre",
    imagem_url: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.7,
    qtd_avaliacoes: 1400
  },
  {
    titulo: "Jogo de Chaves de Fenda e Philips - Profissional",
    categoria: "Oficina em Casa",
    categoria_id: "oficina-em-casa",
    preco: "R$ 115,00",
    especificacoes: ["Aço cromo-vanádio", "Catraca reversível", "Extensões flexíveis"],
    link_afiliado: "https://meli.la/1Fz7Dtp",
    loja: "Mercado Livre",
    imagem_url: "https://images.unsplash.com/photo-1530124560676-4dec8069502f?auto=format&fit=crop&q=80&w=800",
    nota_estrelas: 4.8,
    qtd_avaliacoes: 2200
  }
];
