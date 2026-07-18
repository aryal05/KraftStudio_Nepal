import ProductListing from "./ProductListing";

/**
 * Decor Items Catalog Page
 * 
 * Displays the decor items collection with category-specific configuration.
 * This page is a wrapper around ProductListing that ensures the correct
 * category context is passed based on the URL route.
 */
export default function DecorCatalog() {
  return <ProductListing />;
}
