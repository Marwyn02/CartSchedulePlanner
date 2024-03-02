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
    console.log("In API, ID: ", id, " UserID: ", userId, " Values: ", values);

    const updatedRow = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        time: values.time,
        date: values.weekDays[0],
        place: values.place,
      },
    });

    console.log("Updated: ", updatedRow);
  } catch (error) {
    console.error("ERROR: ", error);
  }

  revalidatePath("/");
  redirect("/");
}
