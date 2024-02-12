/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ListOfDate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppointmentToListOfDate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppointmentToListOfDate_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppointmentToListOfDate_B_fkey" FOREIGN KEY ("B") REFERENCES "ListOfDate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL
);
INSERT INTO "new_Appointment" ("id", "username") SELECT "id", "username" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToListOfDate_AB_unique" ON "_AppointmentToListOfDate"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToListOfDate_B_index" ON "_AppointmentToListOfDate"("B");
