import { Module } from '@nestjs/common';
import { StaffService } from './staff/staff.service';
import { StaffController } from './staff/staff.controller';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [StaffController],
  providers: [PrismaClient, StaffService, UserService],
})
export class AppModule {}
