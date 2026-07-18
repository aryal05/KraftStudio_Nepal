import ProductListing from "./ProductListing";

/**
 * Furniture Catalog Page
 * 
 * Displays the furniture collection with category-specific configuration.
 * This page is a wrapper around ProductListing that ensures the correct
 * category context is passed based on the URL route.
 */
export default function FurnitureCatalog() {
  return <ProductListing />;
}
