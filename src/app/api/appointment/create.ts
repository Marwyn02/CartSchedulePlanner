"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
              place: values.place,
            })),
          },
        },
      });
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }

  revalidatePath("/");
  redirect("/");
}
