import { Controller,Post,Body,Get, Delete, Param,Put } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { TopManagerService } from './top-manager.service';
@ApiTags("Top Level Manager")
@Controller('top-manager')
export class TopManagerController {
    constructor(private userService: UserService, private toplevelManagerService: TopManagerService) {}
    //create a top level manager
    @Post()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Annet Mugai',
                    description: 'Name of the user',
            
                },
                role: {
                    type: 'string',
                    example: 'CEO ',
                    description: 'Role of the user',
                },
            
            },
        }
    })
    @ApiOperation({ summary: 'Add top manager' })
    @ApiResponse({
        status: 201,
        description: 'Top manager added',
    })
    addTopManager(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto, 'topLevelManager');
    }

    //get all top managers
    @Get()
    @ApiOperation({ summary: 'Get all top managers' })
        @ApiResponse({
            status: 201,
            description: 'Top managers added',
        })
    findAll(){
        return this.toplevelManagerService.getAllTopManagers();
    }

    //delete a top manager
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a top manager' })
    @ApiResponse({
        status: 201,
        description: 'Top manager deleted',
    })
    deleteTopManager(@Param('id') id: string){
        return this.userService.deleteUser(id, "topLevelManager");
    }

    //Edit a top manager
    @Put(':id')
    @ApiOperation({ summary: 'Edit a top manager' })
    @ApiResponse({
        status: 201,
        description: 'Top manager edited',
    })
    editTopManager(@Param('id') id: string, @Body() dto: CreateUserDto){
        return this.userService.editUser(id, dto, 'topLevelManager');
    }
    
}
