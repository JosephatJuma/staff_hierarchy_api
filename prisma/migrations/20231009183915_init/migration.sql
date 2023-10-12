/*
  Warnings:

  - The primary key for the `StaffMember` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "StaffMember" DROP CONSTRAINT "StaffMember_managerId_fkey";

-- AlterTable
ALTER TABLE "StaffMember" DROP CONSTRAINT "StaffMember_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "managerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StaffMember_id_seq";

-- AddForeignKey
ALTER TABLE "StaffMember" ADD CONSTRAINT "StaffMember_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StaffMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
