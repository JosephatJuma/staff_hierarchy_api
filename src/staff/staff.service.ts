import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaClient) { }
  
  
  async getAllStaff() {
    const staff = await this.prisma.staffMember.findMany({ include: { subordinates: true, supervisor: true } });
    return staff;
  }
  async getStaffHierarchy() {
  const rootMembers = await this.prisma.staffMember.findMany({
    where: {
      supervisorId: null, // Find top-level members with no supervisor
    },
  });

  const hierarchy = rootMembers.map((member) => this.buildHierarchy(member));
  return hierarchy;
}

// Recursive function to build the hierarchy
buildHierarchy(member) {
  const node = {
    id: member.id,
    role: member.role,
    name: member.name,
    subordinates: [],
  };

  const subordinates = member.subordinates;
  for (const subordinate of subordinates) {
    const subordinateNode = this.buildHierarchy(subordinate);
    node.subordinates.push(subordinateNode);
  }

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


  //second
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

//     const subordinates = await this.prisma.staffMember.findMany({
//       where: {
//         supervisorId: member.id,
        
//       },
//       include:{supervisor:true}
//     });

//     node.subordinates.push(...subordinates);
//     queue.push(...subordinates);

//     if (member.supervisorId === null) {
//       hierarchy.push(node); // Add top-level members to the hierarchy
//     }
//   }

//   return hierarchy;
// }

//first
//   async getStaffHierarchy() {
//   const rootMembers = await this.prisma.staffMember.findMany({
//     where: {
//       supervisorId: null, // Find top-level members with no supervisor
//     },
//     include: {
//       subordinates: {
//         include: {
//           subordinates: {
//             // Continue nesting for deeper levels
//           },
//         },
//       },
//     },
//   });

//   return rootMembers.map((rootMember) => this.buildHierarchy(rootMember));
// }

// // Recursive function to build the hierarchy
// buildHierarchy(member) {
//   if (member.subordinates.length === 0) {
//     return {
//       id: member.id,
//       role: member.role,
//       name: member.name,
//     };
//   } else {
//     return {
//       id: member.id,
//       role: member.role,
//       name: member.name,
//       subordinates: member.subordinates.map((subordinate) => this.buildHierarchy(subordinate)),
//     };
//   }
// }


}