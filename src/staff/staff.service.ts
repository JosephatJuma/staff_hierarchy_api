import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaClient) { }
  
  
  async getAllStaff() {
    const staff = await this.prisma.staffMember.findMany({ include: { subordinates: true, } });
    return staff;
  }

}