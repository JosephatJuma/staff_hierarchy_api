import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TopManagerService {
    constructor(private prisma: PrismaClient) { }
    async getAllTopManagers() {
        const topManagers = await this.prisma.topLevelManager.findMany();
        if(!topManagers) {
            throw new NotFoundException('Top managers have been added found');
        }
        return topManagers;
    }
    
   
}
