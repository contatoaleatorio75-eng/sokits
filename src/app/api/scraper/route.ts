import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Usando uma API de fetch simples. 
    // Nota: Em produção real, o ideal é usar um serviço de proxy ou Headless Browser.
    // Para este MVP, vamos tentar extrair metadados básicos.
    const response = await fetch(url, {
      redirect: 'follow', // Segue amzn.to e outros encurtadores
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    });
    
    const html = await response.text();
    
    // Regex simples para extrair dados básicos (Amazon/Shopee/ML)
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].split(":")[0].trim() : "";
    
    // Tentativa de pegar imagem via OpenGraph
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
    const image = imageMatch ? imageMatch[1] : "";

    // Tentativa de pegar preço via JSON-LD (Dados estruturados - mais confiável)
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let price = "";
    if (jsonLdMatch) {
      try {
        const json = JSON.parse(jsonLdMatch[1].trim());
        const offer = json.offers || (json.mainEntity && json.mainEntity.offers);
        if (offer) {
          price = Array.isArray(offer) ? offer[0].price : offer.price;
        }
      } catch (e) {}
    }

    // Fallbacks de preço via meta tags ou regex de moeda
    if (!price) {
      const priceMeta = html.match(/<meta property="product:price:amount" content="(.*?)"/) || 
                        html.match(/itemprop="price" content="(.*?)"/);
      price = priceMeta ? priceMeta[1] : "";
    }

    // Limpeza e formatação do preço
    if (price) {
      price = price.toString().replace(".", ",");
      if (!price.includes("R$")) price = `R$ ${price}`;
    } else {
      price = "R$ —"; // Deixar vazio ou com traço para o usuário ver que precisa preencher
    }

    return NextResponse.json({
      titulo: title.substring(0, 100),
      preco: price,
      imagem_url: image,
      especificacoes: ["Produto de alta qualidade", "Melhor custo-benefício", "Entrega rápida"],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
