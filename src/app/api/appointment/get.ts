"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAppointment() {
  const appointments: any = await prisma.appointment.findMany({
    include: { user: true },
  });

  return {
    schedules: appointments,
  };
}
