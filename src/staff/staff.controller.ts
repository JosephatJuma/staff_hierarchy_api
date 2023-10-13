import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { UserService } from 'src/user/user.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly userService: UserService,
  ) {}

  //Create a staff
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
          description: 'Name of the user',
        },
        role: {
          type: 'string',
          example: 'Developer ',
          description: 'Role of the staff',
        },
        supervisorId: {
          type: 'string',
          example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          description: 'Id of the manager the staff reports to',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a staff member' })
  @ApiResponse({
    status: 201,
    description: 'Staff member added',
  })
  addStaff(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  //Get all Staff
  @Get()
  @ApiOperation({ summary: 'Get all staff' })
  @ApiResponse({
    status: 200,
    description: 'All Staff Returned',
  })
  findAll() {
    return this.staffService.getAllStaff();
  }
  //Get all Staff hierarchy
  @Get('/hierarchy')
  @ApiOperation({ summary: 'Get Staff in Hierarchy' })
  @ApiResponse({
    status: 200,
    description: 'Staff Hierarchy Returned',
  })
  getHierachy() {
    return this.staffService.getStaffHierarchy();
  }

  //Delete a staff
  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Staff member deleted',
  })
  @ApiOperation({ summary: 'Delete a staff member' })
  deleteStaff(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  //Edit a staff
  @Put(':id')
  @ApiOperation({ summary: 'Edit a staff member' })
  @ApiResponse({
    status: 200,
    description: 'Staff member edited',
  })
  editStaff(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userService.editStaff(id, dto);
  }
}
