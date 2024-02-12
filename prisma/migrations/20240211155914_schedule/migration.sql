/*
  Warnings:

  - You are about to drop the `ListOfDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentToListOfDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ListOfDate";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AppointmentToListOfDate";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppointmentToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppointmentToSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppointmentToSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToSchedule_AB_unique" ON "_AppointmentToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToSchedule_B_index" ON "_AppointmentToSchedule"("B");
