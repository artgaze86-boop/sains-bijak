import 'dotenv/config';
import { execSync } from 'child_process';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('📦 Menyediakan pangkalan data...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });

  const userCount = await prisma.user.count();
  if (userCount === 0 || process.env.RUN_SEED === 'true') {
    console.log('🌱 Menyemai data awal...');
    execSync('node dist/seed/index.js', { stdio: 'inherit' });
  } else {
    console.log(`✅ Pangkalan data sedia (${userCount} pengguna)`);
  }

  console.log('🚀 Memulakan pelayan...');
  await import('../index');
}

main().catch((err) => {
  console.error('Gagal memulakan:', err);
  process.exit(1);
});