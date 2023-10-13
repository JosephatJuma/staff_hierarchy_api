import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaClient) {}

  async getAllStaff() {
    const staff = await this.prisma.staffMember.findMany({
      include: { subordinates: true, supervisor: true },
    });
    return staff;
  }

  async getStaffHierarchy() {
    const rootMembers = await this.prisma.staffMember.findMany({
      where: {
        supervisorId: null, // Find top-level members with no supervisor
      },
    });

    // Fetch the subordinates for each root member and build the hierarchy
    const hierarchy = await Promise.all(
      rootMembers.map(async (member) => {
        return this.buildHierarchy(member);
      }),
    );

    return hierarchy;
  }

  async buildHierarchy(member) {
    const subordinates = await this.prisma.staffMember.findMany({
      where: {
        supervisorId: member.id,
      },
    });

    // Fetch the subordinates for each subordinate member
    const subordinateNodes = await Promise.all(
      subordinates.map(async (subordinate) => {
        return this.buildHierarchy(subordinate);
      }),
    );

    // Build the member node
    const node = {
      id: member.id,
      role: member.role,
      name: member.name,
      subordinates: subordinateNodes,
    };

    return node;
  }

  //three
  //   async getStaffHierarchy() {
  //   const rootMembers = await this.prisma.staffMember.findMany({
  //     where: {
  //       supervisorId: null, // Find top-level members with no supervisor
  //     },
  //   });

  //   const hierarchy = [];
  //   const queue = rootMembers.slice(); // Initialize the queue with top-level members

  //   while (queue.length > 0) {
  //     const member = queue.shift();
  //     const node = {
  //       id: member.id,
  //       role: member.role,
  //       name: member.name,
  //       subordinates: [],
  //     };

  //     let innerQueue = [member]; // Initialize an inner queue with the current member

  //     while (innerQueue.length > 0) {
  //       const currentMember = innerQueue.shift();

  //       const subordinates = await this.prisma.staffMember.findMany({
  //         where: {
  //           supervisorId: currentMember.id,
  //         },
  //         include:{supervisor:true}
  //       });

  //       node.subordinates.push(...subordinates);
  //       innerQueue.push(...subordinates);

  //       if (currentMember.supervisorId === null) {
  //         hierarchy.push(node); // Add top-level members to the hierarchy
  //       }
  //     }
  //   }

  //   return hierarchy;
  // }
}
