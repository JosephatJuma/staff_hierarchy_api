import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaClient) { }
  
  
  async getAllStaff() {
    const staff = await this.prisma.staffMember.findMany({ include: { subordinates: true, } });
    return staff;
  }

  async getStaffHierarchy() {
  const rootMembers = await this.prisma.staffMember.findMany({
    where: {
      supervisorId: null, // Find top-level members with no supervisor
    },
    include: {
      subordinates: {
        include: {
          subordinates: {
            // Continue nesting for deeper levels
          },
        },
      },
    },
  });

  return rootMembers.map((rootMember) => this.buildHierarchy(rootMember));
}

// Recursive function to build the hierarchy
buildHierarchy(member) {
  if (member.subordinates.length === 0) {
    return {
      id: member.id,
      role: member.role,
      name: member.name,
    };
  } else {
    return {
      id: member.id,
      role: member.role,
      name: member.name,
      subordinates: member.subordinates.map((subordinate) => this.buildHierarchy(subordinate)),
    };
  }
}


}