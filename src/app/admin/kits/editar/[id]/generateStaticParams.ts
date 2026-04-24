// generateStaticParams é necessário para export estático com rotas dinâmicas.
// Retorna uma lista vazia pois o admin é client-side only — não pré-renderiza.
export function generateStaticParams() {
  return [];
}
