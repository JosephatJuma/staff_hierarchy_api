/*
  Warnings:

  - You are about to drop the `StaffMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffMember" DROP CONSTRAINT "StaffMember_managerId_fkey";

-- DropTable
DROP TABLE "StaffMember";

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "managerId" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "topLevelManagerId" TEXT,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopLevelManager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "TopLevelManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_topLevelManagerId_fkey" FOREIGN KEY ("topLevelManagerId") REFERENCES "TopLevelManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
