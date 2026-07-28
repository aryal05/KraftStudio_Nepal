import ProductDetail from "@/components/pages/ProductDetail";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetail productSlug={id} />;
}
