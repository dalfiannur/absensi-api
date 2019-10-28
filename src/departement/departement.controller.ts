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
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { DepartementService } from './departement.service'
import { DepartementDTO } from './departement.dto'
import { AuthGuard } from '@nestjs/passport'
import * as _ from 'lodash'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class DepartementController {
  constructor(private readonly service: DepartementService) {}

  @Post('/departement')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: DepartementDTO) {
    return this.service.create({
      ...data,
      code: _.kebabCase(data.name)
    })
  }

  @Put('/departement/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() data: DepartementDTO) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)
    return this.service.update(id, {
      ...data,
      code: _.kebabCase(data.name)
    })
  }

  @Delete('/departement/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)
    return this.service.delete(id)
  }

  @Get('/departement/:id')
  async findById(@Param('id') id: number) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)
    return type
  }

  @Get('/departements')
  getAll(@Query() param: GetAllQuery) {
    return this.service.getAll({
      limit: param.limit || 25,
      page: param.page || 1
    })
  }
}
