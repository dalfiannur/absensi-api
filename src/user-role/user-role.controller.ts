import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { UserRoleService } from './user-role.service'
import { UserRoleDTO } from './user-role.dto'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Post('/user-role')
  create(@Body() data: UserRoleDTO) {
    return this.service.create(data)
  }

  @Put('/user-role/:id')
  async update(@Param('id') id: number, @Body() data: UserRoleDTO) {
    const role = await this.service.findOne(id)
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    return this.service.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const role = await this.service.findOne(id)
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    return this.service.delete(id)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const role = await this.service.findOne(id)
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    return role
  }

  @Get()
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.service.getAll({ limit, page })
  }
}
