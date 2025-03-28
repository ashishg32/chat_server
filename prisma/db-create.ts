// prisma/db-create.ts
import dotenv from 'dotenv';
import path from 'path';
import { execSync } from 'child_process';

const env = process.env.NODE_ENV || 'development';

// Load the correct .env file based on NODE_ENV
dotenv.config({ path: path.resolve(__dirname, `../config/.env.${env}`) });

console.log('Creating and migrating the database...');

// Run Prisma migrate deploy to apply migrations
execSync('npx prisma db push && npx prisma migrate deploy', { stdio: 'inherit' });
