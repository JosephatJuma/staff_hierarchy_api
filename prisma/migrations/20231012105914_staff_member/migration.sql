/*
  Warnings:

  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TopLevelManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_topLevelManagerId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_managerId_fkey";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Staff";

-- DropTable
DROP TABLE "TopLevelManager";

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "supervisorId" TEXT,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffMember" ADD CONSTRAINT "StaffMember_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "StaffMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
