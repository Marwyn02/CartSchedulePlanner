"use server";

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function createAppointment(values: any) {
  try {
    if (values.name !== "") {
      await prisma.user.create({
        data: {
          name: values.name,
          appointment: {
            create: values.weekDays.map((w: string) => ({
              date: w,
              time: values.time,
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
