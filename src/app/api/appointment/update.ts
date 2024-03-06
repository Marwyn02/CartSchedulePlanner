"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function updateAppointment(
  id: number,
  userId: number,
  values: any
) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        time: values.time,
        date: values.updateWeekDays,
        place: values.place,
      },
    });
  } catch (error) {
    console.error("ERROR: ", error);
  }

  revalidatePath("/");
  redirect("/");
}
