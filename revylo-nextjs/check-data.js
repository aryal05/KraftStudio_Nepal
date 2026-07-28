const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '../.env' });

const sql = neon(process.env.DATABASE_URL);

async function checkData() {
  console.log('Checking database data...\n');
  
  const cats = await sql`SELECT id, name, slug FROM categories ORDER BY "displayOrder" LIMIT 5`;
  console.log('Categories:');
  cats.forEach(c => console.log(`  - ${c.name} (${c.slug}) [ID: ${c.id}]`));
  
  const prods = await sql`SELECT id, name, slug, "categoryId" FROM products LIMIT 5`;
  console.log('\nProducts:');
  prods.forEach(p => console.log(`  - ${p.name} (${p.slug}) [CategoryID: ${p.categoryId}]`));
  
  const prodCount = await sql`SELECT COUNT(*) as count FROM products`;
  const catCount = await sql`SELECT COUNT(*) as count FROM categories`;
  
  console.log(`\nTotal: ${catCount[0].count} categories, ${prodCount[0].count} products`);
}

checkData().catch(console.error);
