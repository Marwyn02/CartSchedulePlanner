"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createAppointment(values: any) {
  try {
    if (values) {
      await prisma.user.create({
        data: {
          name: values.username,
          appointment: {
            create: values.weekDays.map((w: string) => ({
              date: w,
            })),
          },
        },
      });
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }
}
