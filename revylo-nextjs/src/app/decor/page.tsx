import { Suspense } from "react";
import ProductListing from "@/components/pages/ProductListing";

export default function DecorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListing />
    </Suspense>
  );
}
