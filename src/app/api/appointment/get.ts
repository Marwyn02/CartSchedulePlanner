"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type TAppointmentProps = {
  id: number;
  date: string;
  place: string;
  time: string | null;
}[];

export default async function getAppointment() {
  const appointment: TAppointmentProps = await prisma.appointment.findMany({
    include: {
      user: true,
    },
  });

  return {
    schedules: appointment,
  };
}
