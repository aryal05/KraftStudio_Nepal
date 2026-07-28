/**
 * Admin User Creation Script
 * 
 * Run this script to create your first admin user:
 * node create-admin.js
 */

const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

// Get database URL from environment
require('dotenv').config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

async function createAdmin() {
  try {
    console.log('🔧 Connecting to database...');
    const sql = neon(DATABASE_URL);

    // Admin credentials - CHANGE THESE!
    const adminEmail = 'admin@kraftstudio.com';
    const adminPassword = 'Admin@123'; // Change this to a secure password
    const adminName = 'Admin User';

    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log('👤 Creating admin user...');
    await sql`
      INSERT INTO users (email, password, name, role, "createdAt", "updatedAt", "lastSignedIn")
      VALUES (
        ${adminEmail},
        ${hashedPassword},
        ${adminName},
        'admin',
        NOW(),
        NOW(),
        NOW()
      )
      ON CONFLICT (email) 
      DO UPDATE SET 
        password = ${hashedPassword},
        "updatedAt" = NOW()
    `;

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('\n🔗 Admin Login URL: http://localhost:3000/admin/login');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdmin();
