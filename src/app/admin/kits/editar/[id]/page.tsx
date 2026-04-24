import EditKitClient from "./EditKitClient";

// Required for Next.js static export with dynamic routes.
// We return an empty array because the admin area is client-only.
export function generateStaticParams() {
  return [{ id: "1" }];
}

export default async function EditarKitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditKitClient kitId={id} />;
}
