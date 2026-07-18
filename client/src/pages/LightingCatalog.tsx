import ProductListing from "./ProductListing";

/**
 * Lighting Catalog Page
 * 
 * Displays the lighting collection with category-specific configuration.
 * This page is a wrapper around ProductListing that ensures the correct
 * category context is passed based on the URL route.
 */
export default function LightingCatalog() {
  return <ProductListing />;
}
