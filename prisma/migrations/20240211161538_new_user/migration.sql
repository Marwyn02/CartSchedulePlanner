/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentToSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `username` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AppointmentToSchedule_B_index";

-- DropIndex
DROP INDEX "_AppointmentToSchedule_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Schedule";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AppointmentToSchedule";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppointmentToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppointmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppointmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL
);
INSERT INTO "new_Appointment" ("id") SELECT "id" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToUser_AB_unique" ON "_AppointmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToUser_B_index" ON "_AppointmentToUser"("B");
