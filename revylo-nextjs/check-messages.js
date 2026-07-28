/**
 * Check Messages Script
 * Verify messages table and data
 */

const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '.env') });

async function checkMessages() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('🔍 Checking messages table...\n');

  try {
    // Get all messages
    const messages = await sql`SELECT * FROM messages ORDER BY "createdAt" DESC LIMIT 5`;
    
    console.log(`📬 Found ${messages.length} message(s):\n`);
    
    if (messages.length === 0) {
      console.log('⚠️  No messages in database yet.');
      console.log('\n💡 You can add test messages from the contact form or insert manually.\n');
    } else {
      messages.forEach((msg, i) => {
        console.log(`Message ${i + 1}:`);
        console.log(`  Name: ${msg.name}`);
        console.log(`  Email: ${msg.email}`);
        console.log(`  Subject: ${msg.subject || '(no subject)'}`);
        console.log(`  Status: ${msg.status}`);
        console.log(`  Starred: ${msg.isStarred}`);
        console.log(`  Priority: ${msg.priority}`);
        console.log(`  Created: ${msg.createdAt}`);
        console.log('');
      });
    }

    // Get stats
    const stats = await sql`
      SELECT 
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE status = 'unread')::int as unread,
        COUNT(*) FILTER (WHERE priority = 'urgent')::int as urgent,
        COUNT(*) FILTER (WHERE "isStarred" = true)::int as starred
      FROM messages
    `;

    console.log('📊 Statistics:');
    console.log(`  Total: ${stats[0].total}`);
    console.log(`  Unread: ${stats[0].unread}`);
    console.log(`  Urgent: ${stats[0].urgent}`);
    console.log(`  Starred: ${stats[0].starred}`);
    console.log('\n✅ Messages table is working correctly!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkMessages();
