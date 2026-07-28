/**
 * Migration Script: Add isStarred and priority fields to messages table
 * Run this with: node migrate-messages.js
 */

const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

async function migrate() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('🔄 Starting migration...');

  try {
    // Check if columns already exist
    const checkColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'messages' 
      AND column_name IN ('isStarred', 'priority')
    `;

    if (checkColumns.length > 0) {
      console.log('⚠️  Columns already exist. Skipping migration.');
      return;
    }

    // Add isStarred column
    await sql`
      ALTER TABLE messages 
      ADD COLUMN IF NOT EXISTS "isStarred" boolean DEFAULT false NOT NULL
    `;
    console.log('✅ Added isStarred column');

    // Add priority column
    await sql`
      ALTER TABLE messages 
      ADD COLUMN IF NOT EXISTS priority varchar(20) DEFAULT 'normal' NOT NULL
    `;
    console.log('✅ Added priority column');

    console.log('🎉 Migration completed successfully!');
    
    // Display current table structure
    const structure = await sql`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns
      WHERE table_name = 'messages'
      ORDER BY ordinal_position
    `;
    
    console.log('\n📋 Current messages table structure:');
    console.table(structure);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
