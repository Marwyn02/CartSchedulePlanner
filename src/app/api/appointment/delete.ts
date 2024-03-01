"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function deleteAppointment(id: number, userId: number) {
  try {
    if (id) {
      // DELETES THE APPOINTMENT
      const deleteAppointment = await prisma.appointment.delete({
        where: {
          id: id,
        },
      });

      if (deleteAppointment) {
        // CHECKS THE USER OF THE APPOINTMENT
        // IF THE USER HAS STILL HAVE AN APPOINTMENT
        // >> THEN PROCEED

        // ELSE RETURN TO END
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            appointment: true,
          },
        });

        if (user && user.appointment.length === 0) {
          // IF THE USER HAS NO APPOINTMENT LEFT
          // THEN DELETES THE USER ROW
          await prisma.user.delete({
            where: {
              id: userId,
            },
          });
          console.log(
            `User with ID ${userId} deleted because appointments array became empty.`
          );
        }
      }
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }

  revalidatePath("/");
  redirect("/");
}
