"use server";

import { PrismaClient, Appointment } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAppointment() {
  const appointments: Appointment[] = await prisma.appointment.findMany();
  return {
    schedules: appointments,
  };
}
