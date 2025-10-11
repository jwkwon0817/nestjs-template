import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../client';

const prisma = new PrismaClient;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log('🌱 Start seeding...');

  // Test users
  const testUsers = [
    {
      email:    'admin@example.com',
      password: await hashPassword('password123'),
      status:   'ACTIVE' as const,
    },
    {
      email:    'user@example.com',
      password: await hashPassword('password123'),
      status:   'ACTIVE' as const,
    },
    {
      email:    'inactive@example.com',
      password: await hashPassword('password123'),
      status:   'INACTIVE' as const,
    },
  ];

  for (const userData of testUsers) {
    const user = await prisma.user.upsert({
      where:  { email: userData.email },
      update: {},
      create: userData,
    });

    console.log(`✅ Created user: ${user.email} (${user.status})`);
  }

  console.log('🌱 Seeding finished.');
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

