/**
 * Seed Test Messages
 * Add sample messages for testing the admin interface
 */

const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '.env') });

async function seedMessages() {
  const sql = neon(process.env.DATABASE_URL);

  console.log('🌱 Seeding test messages...\n');

  const testMessages = [
    {
      name: 'testing123',
      email: 'aryal.rajat05@gmail.com',
      phone: '21323323232',
      subject: 'Welcome to Auth',
      message: 'test',
      status: 'unread',
      isStarred: false,
      priority: 'normal'
    },
    {
      name: 'Amanda Collins',
      email: 'amanda.collins@example.com',
      phone: '555-0199',
      subject: 'Partnership Inquiry',
      message: 'Hi, I\'m interested in partnering with your company for our new retail location. Can we schedule a meeting?',
      status: 'read',
      isStarred: true,
      priority: 'normal'
    },
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '555-0123',
      subject: 'URGENT: Delivery Issue',
      message: 'I ordered a sofa last week and it still hasn\'t arrived. Order #12345. Please help!',
      status: 'unread',
      isStarred: false,
      priority: 'urgent'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: null,
      subject: 'Product Question',
      message: 'What are the dimensions of the Modern Dining Table? I need to make sure it fits in my dining room.',
      status: 'replied',
      isStarred: true,
      priority: 'normal'
    },
    {
      name: 'Michael Brown',
      email: 'mbrown@example.com',
      phone: '555-0145',
      subject: 'Custom Order Request',
      message: 'I would like to order a custom version of your Velvet Armchair in navy blue. Is this possible?',
      status: 'unread',
      isStarred: false,
      priority: 'normal'
    },
    {
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '555-0167',
      subject: 'URGENT: Damaged Product',
      message: 'The lamp I received arrived broken. I need a replacement ASAP as it was a gift.',
      status: 'unread',
      isStarred: true,
      priority: 'urgent'
    }
  ];

  try {
    for (const msg of testMessages) {
      await sql`
        INSERT INTO messages (name, email, phone, subject, message, status, "isStarred", priority)
        VALUES (${msg.name}, ${msg.email}, ${msg.phone}, ${msg.subject}, ${msg.message}, ${msg.status}, ${msg.isStarred}, ${msg.priority})
      `;
      console.log(`✅ Added message from ${msg.name}`);
    }

    console.log('\n🎉 Successfully seeded test messages!');
    
    // Show stats
    const stats = await sql`
      SELECT 
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE status = 'unread')::int as unread,
        COUNT(*) FILTER (WHERE priority = 'urgent')::int as urgent,
        COUNT(*) FILTER (WHERE "isStarred" = true)::int as starred
      FROM messages
    `;

    console.log('\n📊 Updated Statistics:');
    console.log(`  Total: ${stats[0].total}`);
    console.log(`  Unread: ${stats[0].unread}`);
    console.log(`  Urgent: ${stats[0].urgent}`);
    console.log(`  Starred: ${stats[0].starred}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedMessages();
