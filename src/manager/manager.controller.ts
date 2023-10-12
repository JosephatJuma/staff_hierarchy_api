import { Controller,Post,Body,Get, Delete,Param,Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { ManagerService } from './manager.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags("Manager")
@Controller('manager')
export class ManagerController {
    constructor(private userService: UserService, private managerService: ManagerService) { }
    //Create a manager
    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Kevin Zadi',
                    description: 'Name of the user',
            
                },
                role: {
                    type: 'string',
                    example: 'Human Resources Manager ',
                    description: 'Role of the user',
                },
                supervisorId: {
                    type: 'string',
                    example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                    description: 'Id of the person the manager reports to',
                },
            
            },
        }
    })
    @ApiOperation({ summary: 'Add manager' })
    @ApiResponse({
        status: 201,
        description: 'Manager added',
    })
    addManager(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto, 'manager');
    }

    //Get All Managers
    @Get()
    @ApiOperation({ summary: 'Get all managers' })
    @ApiResponse({
        status: 200,
        description: 'Managers Returned',
    })
    findAll(){
        return this.managerService.getAllManagers();
    }

    //Delete a manager
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a manager' })
    @ApiResponse({
        status: 201,
        description: 'Manager deleted',
    })
    deleteManager(@Param('id') id: string){
        return this.userService.deleteUser(id, 'manager');
    }

    
    // Edit a manager
    @Put(':id')
    @ApiOperation({ summary: 'Edit a manager' })
    @ApiResponse({
        status: 200,
        description: 'Manager updated',
    })
    editManager(@Param('id') id: string, @Body() dto: CreateUserDto) {
        return this.userService.editUser(id, dto, 'manager');
    }
    

}
