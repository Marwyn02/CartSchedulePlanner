//
//
//
//
//
//
//

// THIS IS IF ONLY IF THE AMOUNT OF DATA MONTHLY TAKES TOO MUCH,
// SO PLEASE DONT RUN THIS CODE HEHE :)

"use server";

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// import { oldDate } from "@/app/api/date";

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function deletion() {
  // const oldWeekDays: string[] = oldDate();

  const day = [""];

  try {
    // GET THE APPOINTMENT OBJECT BY ITS EXPIRED DATE
    const appointments = await prisma.appointment.findMany({
      where: {
        date: { in: day },
      },
      include: {
        user: true,
      },
    });

    if (appointments) {
      const appointmentsId = appointments.map((a) => a.id);
      const deletesAppointment = appointmentsId.map(async (id) => {
        await prisma.appointment.delete({
          where: { id: id },
        });
      });

      if (deletesAppointment) {
        // FLATTEN THE ARRAY TO GET THE USER ID
        const expiredAppointmentsUserArray = appointments.flatMap(
          (a) => a.user
        );
        const expiredAppointmentsId = expiredAppointmentsUserArray.map(
          (e) => e.id
        );

        if (expiredAppointmentsId && expiredAppointmentsId.length !== 0) {
          expiredAppointmentsId.map(async (e) => {
            const user = await prisma.user.findUnique({
              where: { id: e },
              include: {
                appointment: true,
              },
            });

            if (user && user.appointment.length === 0) {
              await prisma.user.delete({
                where: { id: user?.id },
              });
            }
          });
        }
      }
    }
  } catch (error) {
    console.error("Error in this Deletion API: ", error);
  }
}
