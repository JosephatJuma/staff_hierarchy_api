import { Injectable, BadGatewayException,NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { retry } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaClient) { }
    async createUser(dto: CreateUserDto, userType: string) {
        switch (userType) {
            case 'topLevelManager':
                const topLevelManager = await this.prisma.topLevelManager.create({
                    data: {
                        name: dto.name,
                        role: dto.role, 
                    },
                })
                return { message: "Manager created", topLevelManager };
            case 'manager':
                await this.checkSupervisorExists(dto.supervisorId);
                const manager = await this.prisma.manager.create({
                    data: {
                        name: dto.name,
                        role: dto.role,
                        topLevelManagerId: dto.supervisorId,
                    },
                })
                return { message: "Manager created", manager };
            case "staff":
                await this.checkManagerExists(dto.supervisorId);
                const staff = await this.prisma.staff.create({
                    data: {
                        name: dto.name,
                        role: dto.role,
                        managerId: dto.supervisorId,
                    },
                })
                return { message: "Staff created", staff };
            default:
                throw new BadGatewayException('Invalid user type');    
        }
        
        
    }
    async deleteUser(id: string, userType: string) {
        switch (userType) {
            case 'topLevelManager':
                await this.checkSupervisorExists(id);
                await this.prisma.topLevelManager.delete({
                    where: {
                        id: id,
                    },
                })
                return { message: "Manager deleted" };
            case 'manager':
                await this.checkManagerExists(id);
                await this.prisma.manager.delete({
                    where: {
                        id: id,
                    },
                })
                return { message: "Manager deleted" };
            case "staff":
                await this.checkStaffExists(id);
                await this.prisma.staff.delete({
                    where: {
                        id: id,
                    },
                })
                return { message: "Staff deleted" };
            default:
                throw new BadGatewayException('Invalid user type');
        }
    }

    async editUser(id: string, dto: CreateUserDto, userType: string) {
        switch (userType) {
            case 'topLevelManager':
                await this.checkSupervisorExists(id);
                const topLevelManager = await this.prisma.topLevelManager.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: dto.name,
                        role: dto.role,
                    },
                })
                return { message: "Manager updated", topLevelManager };
            case 'manager':
                await this.checkManagerExists(id);
                const manager = await this.prisma.manager.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: dto.name,
                        role: dto.role,
                        topLevelManagerId: dto.supervisorId,
                    }
                });
            case 'staff':
                await this.checkStaffExists(id);
                const staff = await this.prisma.staff.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: dto.name,
                        role: dto.role,
                        managerId: dto.supervisorId,
                    }
                })
                return { message: "Staff updated", staff };
        }
}

    private async checkSupervisorExists(supervisorId: string) {
        const supervisor = await this.prisma.topLevelManager.findUnique({
            where: {
                id: supervisorId,
            },
        })
        if(!supervisor) {
            throw new NotFoundException('Supervisor not found');
        }
    }
    private async checkManagerExists(managerId: string) {
        const manager = await this.prisma.manager.findUnique({
            where: {
                id: managerId,
            },
        })
        if(!manager) {
            throw new NotFoundException('Manager not found');
        }
    }
    private async checkStaffExists(managerId: string) {
        const staff = await this.prisma.staff.findUnique({
            where: {
                id: managerId,
            },
        })
        if(!staff) {
            throw new NotFoundException('Staff not found');
        }
    }

}
