import {PrismaClient} from '@prisma/client';
import {config} from 'dotenv';
import {Cats} from '@/features/cats/seed';
import {Owners} from '@/features/owners/seed';
config();
const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const clean = async () => {
  await client.cat.deleteMany();
  await client.owner.deleteMany();
};

const setup = async () => {
  await client.$connect();
  await clean();
};

const main = async () => {
  for (const row of Owners(10)) {
    await client.owner.create({
      data: row,
    });
  }
  for (const row of Cats(10)) {
    await client.cat.create({
      data: row,
    });
  }
};

const teardown = async () => {
  console.log(`[Create] Owners:${await client.owner.count()}`);
  console.log(`[Create] Cats:${await client.cat.count()}`);
  await client.$disconnect();
};

(async () => {
  await setup();
  await main();
  await teardown();
})();
