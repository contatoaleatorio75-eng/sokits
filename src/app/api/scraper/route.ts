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
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    
    const html = await response.text();
    
    // Regex simples para extrair dados básicos (Amazon/Shopee/ML)
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].split(":")[0].trim() : "";
    
    // Tentativa de pegar imagem via OpenGraph
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
    const image = imageMatch ? imageMatch[1] : "";

    // Tentativa de pegar preço (Padrão genérico de microdados)
    const priceMatch = html.match(/price" content="(.*?)"/) || html.match(/itemprop="price">(.*?)<\/span>/);
    let price = priceMatch ? priceMatch[1].trim() : "";
    if (price && !price.includes("R$")) price = `R$ ${price}`;

    return NextResponse.json({
      titulo: title.substring(0, 100),
      preco: price || "R$ 99,90",
      imagem_url: image,
      especificacoes: ["Produto de alta qualidade", "Melhor custo-benefício", "Entrega rápida"],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scrape" }, { status: 500 });
  }
}
