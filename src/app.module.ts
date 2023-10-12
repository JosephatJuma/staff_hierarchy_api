import { Module } from '@nestjs/common';
import { StaffService } from './staff/staff.service';
import { StaffController } from './staff/staff.controller';
import { PrismaClient } from '@prisma/client';
import { ManagerService } from './manager/manager.service';
import { UserService } from './user/user.service';
import { TopManagerService } from './top-manager/top-manager.service';
import { TopManagerController } from './top-manager/top-manager.controller';
import { ManagerController } from './manager/manager.controller';

@Module({
  imports: [],
  controllers: [StaffController, TopManagerController, ManagerController],
  providers: [PrismaClient,StaffService, ManagerService, UserService, TopManagerService],
})
export class AppModule {}
