import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ManagerService {
    constructor(private prisma: PrismaClient) { }
    async getAllManagers() {
        const managers = await this.prisma.manager.findMany();
        return managers;
    }
}
