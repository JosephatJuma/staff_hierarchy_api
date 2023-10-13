import {
  Injectable,
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { retry } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}
  async createUser(dto: CreateUserDto) {
    const staffMember = await this.prisma.staffMember.create({
      data: { ...dto },
    });
    return { message: 'Staff member created successfully', staffMember };
  }
  async deleteUser(id: string) {
    await this.checkStaffExist(id, 'Staff does not exist');
    await this.prisma.staffMember.delete({
      where: {
        id: id,
      },
    });
    return { message: 'Staff has been deleted' };
  }

  async editStaff(id: string, dto: CreateUserDto) {
    await this.checkStaffExist(id, 'Staff does not exist');
    const staff = await this.prisma.staffMember.update({
      where: { id: id },
      data: { ...dto, id:id },
    });
    return { message: 'Staff updated successfully', staff };
  }

  private async checkStaffExist(id: string, erroMessge: string) {
    const staff = await this.prisma.staffMember.findUnique({
      where: {
        id: id,
      },
    });
    if (!staff) {
      throw new NotFoundException(erroMessge);
    }
  }
}
