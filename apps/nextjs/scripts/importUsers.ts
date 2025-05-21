const { PrismaClient } = require('@prisma/client');
const { parse } = require('csv-parse/sync');
const fs = require('fs');


const prisma = new PrismaClient();

async function main() {
  const file = fs.readFileSync('./scripts/data/data.csv', 'utf8');
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const record of records) {
    await prisma.golfer.create({
      data: {
        name: record.name,
        email: record.email,
        // map other fields as needed
      },
    });
  }

  console.log('Imported users!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
