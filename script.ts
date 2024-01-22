import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const appointment = await prisma.appointment.create({
    data: {
      username: "Alice",
      date: "alice@prisma.io",
    },
  });
  console.log(appointment);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
