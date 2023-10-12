-- CreateTable
CREATE TABLE "StaffMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "managerId" INTEGER,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffMember" ADD CONSTRAINT "StaffMember_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StaffMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
