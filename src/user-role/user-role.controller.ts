import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleDTO } from './user-role.dto';

type GetAllQuery = {
  page?: number;
  limit?: number;
};

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Post()
  create(@Body() data: UserRoleDTO) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UserRoleDTO) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get()
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.service.getAll({ limit, page });
  }
}
