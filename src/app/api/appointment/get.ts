"use server";

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

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
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  return {
    schedules: appointment,
  };
}
