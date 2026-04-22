#!/usr/bin/env node
/**
 * Setup script to initialize the database with an admin user
 * Usage: node setup-admin.js
 */

import db from './src/config/db.js'
import User from './src/models/user.model.js'
import dotenv from 'dotenv'

dotenv.config()

async function setupAdmin() {
  try {
    console.log('🔧 Setting up admin user...')

    // Check if admin already exists
    const existingAdmin = await User.findByEmail('admin@michelin.com')
    if (existingAdmin) {
      console.log('✅ Admin user already exists')
      process.exit(0)
    }

    // Create admin user with password 'admin123'
    const hashedPassword = await User.hashPassword('admin123')
    await User.createAdmin(
      'admin@michelin.com',
      'admin',
      hashedPassword,
      'Admin',
      'User'
    )

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@michelin.com')
    console.log('🔑 Password: admin123')
    console.log('⚠️  Please change this password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error setting up admin:', error)
    process.exit(1)
  }
}

setupAdmin()
